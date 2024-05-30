import {
	IonButton,
	IonContent,
	IonIcon,
	IonInput,
	IonLoading,
	IonPage,
	IonTitle,
	IonToast,
} from '@ionic/react';
import { useState } from 'react';
import './login.css';
import axios from 'axios';

export const Register: React.FC = () => {
	const [user, setUser] = useState({ nombre: '', apellido: '', email: '', password: '', confirmarPassword: ''});
	const [showLoading, setShowLoading] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');

	const handleRegister = async () => {
		try {
			if(Object.values(user).some(el => el == '')){
				setToastMessage('Todos los campos son requeridos')
				return setShowToast(true)
			} else if(user.confirmarPassword != user.password) {
				setToastMessage('El password no coincide')
				return setShowToast(true)
			}
			setShowLoading(true);
			const { confirmarPassword, ...userParams } = user
			const { data } = await axios.post(`/registrar-usuario`, userParams);
			window.location.href = '/login';
		} catch (error) {
			console.error({ error });
		}finally{
			setShowLoading(false);
		}
	};

	const handleInputChange = (e: any) => {
		let { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	return (
		<IonPage>
			<IonContent fullscreen>
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100dvh" }}>
					<div className="card-login">
						<IonTitle size="large" style={{ textAlign: "center"}}>Registro</IonTitle>
						<IonInput
							value={user.nombre}
							onIonChange={e => handleInputChange(e)}
							placeholder="Nombre"
							name="nombre"
						/>
						<IonInput
							value={user.apellido}
							onIonChange={e => handleInputChange(e)}
							placeholder="Apellido"
							name="apellido"
						/>
						<IonInput
							value={user.email}
							onIonChange={e => handleInputChange(e)}
							placeholder="Correo"
							name="email"
						/>
						<IonInput
							type="password"
							value={user.password}
							onIonChange={e => handleInputChange(e)}
							placeholder="Password"
							name="password"
						/>
						<IonInput
							type="password"
							value={user.confirmarPassword}
							onIonChange={e => handleInputChange(e)}
							placeholder="Confirmar password"
							name="confirmarPassword"
						/>
						<IonButton expand="full" shape="round" onClick={handleRegister}>Registrar</IonButton>
						<IonButton expand="full" color={'tertiary'} routerLink={'/login'} shape="round">Ya tengo una cuenta</IonButton>
						<IonLoading
							isOpen={showLoading}
							message={'Procesando...'}
						/>
					</div>
				</div>
				<IonToast
					isOpen={showToast}
					onDidDismiss={() => setShowToast(false)}
					message={toastMessage}
					position='top'
					color={'danger'}
					duration={2000}
				/>
			</IonContent>
		</IonPage>
	);
};