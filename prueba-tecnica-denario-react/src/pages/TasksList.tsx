import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonButton,
	IonList,
	IonItem,
	IonLabel,
	IonButtons,
	IonIcon,
	IonText,
} from '@ionic/react';
import { addOutline, ellipse } from 'ionicons/icons'
import { useEffect, useState } from 'react';
import { ModalNewTask } from '../components/ModalNewTask';
import axios from 'axios';
import { ModalUpdateTask } from '../components/ModalUpdateTask';

export type taskType = {
	idTarea?: number,
	descripcion: string,
	titulo: string,
	fechaVencimiento: string,
	estado: number
}

export const TaskListView = () => {
	const [tasks, setTasks] = useState<taskType[]>([]);

	const [newTask, setNewTask] = useState<taskType>({ titulo: '', descripcion: '', fechaVencimiento: new Date().toISOString().split('T')[0], estado: 1 });
	const [taskEdit, setTaskEdit] = useState<taskType>({ titulo: '', descripcion: '', fechaVencimiento: '', estado: 0 });

	const [showModal, setShowModal] = useState(false);
	const [showModalEdit, setShowModalEdit] = useState(false);
	const styleStatus: Record<number, { color: string, text: string }> = {
		1: {
			color: 'danger',
			text: 'Pendiente',
		},
		2: {
			color: 'warning',
			text: 'En Progreso'
		},
		3: {
			color: 'success',
			text: 'Completada',
		},
	};

	useEffect(() => {
		obtenerTareas()
	}, []);

	const startTask = async  (item: taskType) => {
		const { data } = await axios.put(`/tarea/${item.idTarea}/cambiar-estado`, { estado: 2});
		obtenerTareas()
	};

	const completeTask = async (item: taskType) => {
		const { data } = await axios.put(`/tarea/${item.idTarea}/cambiar-estado`, { estado: 3});
		obtenerTareas()
	};

	const deleteTask = async (item: taskType) => {
		const { data } = await axios.delete(`/tarea/${item.idTarea}`);
		if(data) setTasks(tasks.filter(el => el.idTarea !== item.idTarea));
	};

	const handleLogout = async () => {
		try {
			const data = await axios.post('/logout');
			if (data?.status === 200)
			localStorage.removeItem('token')
			window.location.href = '/login'
		} catch (error) {
			console.error(error)
		}
	};

	const obtenerTareas = async () => {
		try {
			const { data } = await axios.get('/tarea');
			setTasks(data)
		} catch (error) {
			console.error(error)
		}
	};


	const handleInputChange = (e: any) => {
		let { name, value } = e.target;
		// if (name === 'fechaVencimiento') value = new Date(value).toISOString().split('T')[0];
		setNewTask({ ...newTask, [name]: value });
	};

	const handleInputEditTaskChange = (e: any) => {
		let { name, value } = e.target;
		// if (name === 'fechaVencimiento') value = new Date(value).toISOString().split('T')[0];
		setTaskEdit({ ...taskEdit, [name]: value });
	};
	const addTask = async () => {
		const { data } = await axios.post('/tarea', newTask);
		if(data){
			setShowModal(false);
			obtenerTareas()
			setNewTask({ titulo: '', descripcion: '', fechaVencimiento: '', estado: 1 });
		}
	};
	const updateTask = async () => {
		const { idTarea, ...taskParams} = taskEdit;
		const { data } = await axios.put(`/tarea/${idTarea}`, taskParams);
		if(data){
			setShowModalEdit(false);
			obtenerTareas()
			setTaskEdit({ titulo: '', descripcion: '', fechaVencimiento: '', estado: 0 });
		}
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Lista de Tareas</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={handleLogout}>Logout</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<ModalNewTask addTask={addTask} handleInputChange={handleInputChange} newTask={newTask} setShowModal={setShowModal} showModal={showModal} />
				<ModalUpdateTask updateTask={updateTask} handleInputChange={handleInputEditTaskChange} task={taskEdit} setTaskEdit={setTaskEdit} setShowModalEdit={setShowModalEdit} showModalEdit={showModalEdit} />
				<div style={{ maxWidth: "800px", margin: "20px auto" }}>
					<IonButton expand="full" onClick={() => setShowModal(true)} shape='round'>
						<IonIcon slot="start" icon={addOutline} />
						Agregar Tarea
					</IonButton>
					<IonList>
						{tasks.map((task, index) => (
							<IonItem key={task.idTarea ?? index}>
								<IonLabel>
									<h2>{task.titulo}</h2>
									<p>{task.descripcion}</p>
									<p><strong>Vencimiento:</strong> {task.fechaVencimiento}</p>
									<IonButton onClick={() => {setTaskEdit(task); setShowModalEdit(true)}} color='primary' shape='round'>
										Editar
									</IonButton>
								</IonLabel>

								<div className="">
									<div className="flex-end">
										<IonIcon icon={ellipse} size='small' color={styleStatus[task.estado]?.color} />
										<IonText color={styleStatus[task.estado]?.color}>{styleStatus[task.estado]?.text}</IonText>
									</div>
									{task.estado === 1 && (
										<IonButton onClick={() => startTask(task)} color='primary' shape='round'>
											Iniciar
										</IonButton>
									)}
									{task.estado === 2 && (
										<IonButton onClick={() => completeTask(task)} color='success' shape='round'>
											Finalizar
										</IonButton>
									)}
									<IonButton onClick={() => deleteTask(task)} color='danger' shape='round'>
										Eliminar
									</IonButton>
								</div>
							</IonItem>
						))}
					</IonList>
				</div>
			</IonContent>
		</IonPage>
	);
};