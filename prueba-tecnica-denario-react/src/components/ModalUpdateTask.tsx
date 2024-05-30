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
	showModalEdit: boolean;
	task: taskType;
	setTaskEdit:  (task: taskType) => void;
	setShowModalEdit: (show: boolean) => void;
	handleInputChange: (e: any) => void;
	updateTask: () => void;
}

export const ModalUpdateTask = (props: TaskProps) => {

	return (
		<IonModal isOpen={props.showModalEdit} onDidDismiss={() => props.setShowModalEdit(false)}>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Editar Tarea</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonItem>
					<IonLabel position="stacked">Título</IonLabel>
					<IonInput
						value={props.task.titulo}
						placeholder="Ingrese el título"
						name="titulo"
						onIonChange={props.handleInputChange}
					/>
				</IonItem>
				<IonItem>
					<IonLabel position="stacked">Descripción</IonLabel>
					<IonInput
						value={props.task.descripcion}
						placeholder="Ingrese la descripción"
						name="descripcion"
						onIonChange={props.handleInputChange}
					/>
				</IonItem>
				<IonItem>
					<IonLabel position="stacked">Fecha de Vencimiento</IonLabel>
					<IonDatetime
						value={props.task.fechaVencimiento}
						name="fechaVencimiento"
						presentation="date"
						onIonChange={props.handleInputChange}
					/>
				</IonItem>
				<IonButton expand="full" onClick={props.updateTask} shape='round'>Actualizar</IonButton>
				<IonButton expand="full" color="light" onClick={() => props.setShowModalEdit(false)} shape='round'>Cancelar</IonButton>
			</IonContent>
		</IonModal>
	);
};