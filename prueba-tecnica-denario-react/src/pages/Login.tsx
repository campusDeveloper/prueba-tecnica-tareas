import {
	IonAlert,
	IonButton,
	IonContent,
	IonIcon,
	IonInput,
	IonItem,
	IonLoading,
	IonPage,
	IonTitle,
	IonToast,
} from '@ionic/react';
import { personOutline, lockClosedOutline } from 'ionicons/icons'
import { useState } from 'react';
import axios from 'axios';
import './login.css';
import { Redirect } from 'react-router';

export const Login: React.FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showLoading, setShowLoading] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');

	function useOscar(valorInicial: any) {
		let variableOscar = valorInicial
		const setVariableOscar = (value: any) =>{
			variableOscar = value
		}
		return [variableOscar, setVariableOscar]
	}

	const handleLogin = async () => {
		try {
			setShowLoading(true);
			const data = await axios.post('/login', { correo: username, password });

			if(data?.status === 200) {
				localStorage.setItem('token', data.data.token);
				window.location.href = '/tasks';
			}
		} catch (error) {
			setToastMessage('Ocurrio un problema con los datos');
    		setShowToast(true);
		} finally {
			setShowLoading(false);
		}
    };

	return (
		<IonPage>
			<IonContent fullscreen>
				<IonToast
					isOpen={showToast}
					onDidDismiss={() => setShowToast(false)}
					message={toastMessage}
					position='top'
					color={'danger'}
					duration={2000}
				/>
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100dvh" }}>
					<div className="card-login">
						<IonTitle size="large" style={{ textAlign: "center"}}>Login</IonTitle>
						<IonInput
							value={username}
							onIonChange={e => setUsername(e.target.value as string)}
							placeholder="Usuario"
						>
							<div slot="label">
								<IonIcon icon={ personOutline } />
							</div>
						</IonInput>
						<IonInput
							type="password"
							value={password}
							onIonChange={e => setPassword(e.target.value as string)}
							placeholder="Contraseña"
						>
							<div slot="label">
								<IonIcon icon={ lockClosedOutline } />
							</div>
						</IonInput>
						<IonButton expand="full" shape="round" onClick={handleLogin}>Ingresar</IonButton>
						<IonButton expand="full" color={'tertiary'} routerLink={'/register'} shape="round">Registrar</IonButton>
						<IonLoading
							isOpen={showLoading}
							message={'Ingresando...'}
						/>
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};