import {
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonButton,
	IonItem,
	IonLabel,
	IonInput,
	IonDatetime,
	IonModal
} from '@ionic/react';
import { taskType } from '../pages/TasksList';

type TaskProps = {
	showModal: boolean;
	newTask: taskType;
	setShowModal: (show: boolean) => void;
	handleInputChange: (e: any) => void;
	addTask: () => void;
}

export const ModalNewTask = (props: TaskProps) => {

	return (
		<IonModal isOpen={props.showModal} onDidDismiss={() => props.setShowModal(false)}>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Nueva Tarea</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonItem>
					<IonLabel position="stacked">Título</IonLabel>
					<IonInput
						value={props.newTask.titulo}
						placeholder="Ingrese el título"
						name="titulo"
						onIonChange={props.handleInputChange}
					/>
				</IonItem>
				<IonItem>
					<IonLabel position="stacked">Descripción</IonLabel>
					<IonInput
						value={props.newTask.descripcion}
						placeholder="Ingrese la descripción"
						name="descripcion"
						onIonChange={props.handleInputChange}
					/>
				</IonItem>
				<IonItem>
					<IonLabel position="stacked">Fecha de Vencimiento</IonLabel>
					<IonDatetime
						value={props.newTask.fechaVencimiento}
						name="fechaVencimiento"
						presentation="date"
						onIonChange={props.handleInputChange}
					/>
				</IonItem>
				<IonButton expand="full" onClick={props.addTask} shape='round'>Agregar</IonButton>
				<IonButton expand="full" color="light" onClick={() => props.setShowModal(false)} shape='round'>Cancelar</IonButton>
			</IonContent>
		</IonModal>
	);
};