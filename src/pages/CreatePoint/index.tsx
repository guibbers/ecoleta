import React, { useEffect, useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { MapContainer, TileLayer, Marker, useMapEvent } from "react-leaflet";
import axios from "axios";
import type { LatLngExpression, LeafletMouseEvent } from "leaflet";
import api from "../../services/api";

import "./styles.css";
import logo from "../../assets/logo.svg";

interface Item {
	id: number;
	title: string;
	image_url: string;
}

interface IBGEUFResponse {
	sigla: string;
}

interface IBGECityResponse {
	nome: string;
}

const CreatePoint = () => {
	const [items, setItems] = useState<Item[]>([]);
	const [ufs, setUfs] = useState<string[]>([]);
	const [selectedUF, setSelectedUF] = useState<string>("0");
	const [cities, setCities] = useState<string[]>([]);
	const [selectedCity, setSelectedCity] = useState<string>('0');
	const [selectedPosition, setSelectedPosition ] = useState<[number, number]>([0, 0]);
	const [initialPosition, setInitialPosition] = useState<[number, number]>();

	const handleMapClick = (lat: number, lng: number) => {
    setSelectedPosition([lat, lng]);
	}

	useEffect(()=> {
		navigator.geolocation.getCurrentPosition(position => {
			const { latitude, longitude } = position.coords;
			setInitialPosition([latitude, longitude]);
		})
	}, [])

	useEffect(() => {
		api.get("items").then((response) => {
			setItems(response.data);
		});
	}, []);

	useEffect(() => {
		axios
			.get<IBGEUFResponse[]>(
				"https://servicodados.ibge.gov.br/api/v1/localidades/estados",
			)
			.then((response) => {
				const ufInitials = response.data.map((uf) => uf.sigla);
				setUfs(ufInitials);
			});
	}, []);

	useEffect(() => {
		if (selectedUF === '0') {
			return;
		}

		axios
			.get<IBGECityResponse[]>(
				`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`,
			)
			.then((response) => {
				const cityNames = response.data.map( city => city.nome)
				setCities(cityNames);
			});
		
		
	},[selectedUF]);

	function handleSelectUF(event: ChangeEvent<HTMLSelectElement>) {
		const uf = event.target.value;
		setSelectedUF(uf);
	}

	function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
		const city = event.target.value;
		setSelectedCity(city);		
	}

	function ClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
		useMapEvent('click', (e) => {
			onMapClick(e.latlng.lat, e.latlng.lng);
		});
	
		return null;
	}

	return (
		<div id="page-create-point">
			<header>
				<img src={logo} alt="Ecoleta" />

				<Link to="/">
					<FiArrowLeft />
					Voltar para home
				</Link>
			</header>

			<form action="">
				<h1>
					Cadastro do <br /> ponto de coleta
				</h1>

				<fieldset>
					<legend>
						<h2>Dados</h2>
					</legend>

					<div className="field">
						<label htmlFor="name">Nome da entidade</label>
						<input type="text" name="name" id="name" />
					</div>
					<div className="field-group">
						<div className="field">
							<label htmlFor="email">E-mail</label>
							<input type="email" name="email" id="email" />
						</div>

						<div className="field">
							<label htmlFor="whatsapp">Whatsapp</label>
							<input type="text" name="whatsapp" id="whatsapp" />
						</div>
					</div>
				</fieldset>

				<fieldset>
					<legend>
						<h2>Endereço</h2>
						<span>Selecione o endereço no mapa</span>
					</legend>

					{initialPosition && (
						<MapContainer center={initialPosition} zoom={15} scrollWheelZoom={true}>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
							<Marker position={selectedPosition} />
							<ClickHandler onMapClick={handleMapClick} />
						</MapContainer>
					)}

					<div className="field-group">
						<div className="field">
							<label htmlFor="uf">Estado (UF)</label>
							<select name="uf" value={selectedUF} id="uf" onChange={handleSelectUF}>
								<option value="0">Selecione uma UF</option>
								{ufs.map((uf) => (
									<option value={uf} key={uf}>
										{uf}
									</option>
								))}
							</select>
						</div>

						<div className="field">
							<label htmlFor="city">Cidade</label>
							<select name="city" id="city" onChange={handleSelectCity}>
								<option value="0">Selecione uma cidade</option>
								{cities.map((city) => (
									<option value={city} key={city}>
										{city}
									</option>
								))}
							</select>
						</div>
					</div>
				</fieldset>

				<fieldset>
					<legend>
						<h2>Itens de coleta</h2>
						<span>Selecione um ou mais itens abaixo</span>
					</legend>

					<ul className="items-grid">
						{items.map((item) => (
							<li key={item.id}>
								<img src={item.image_url} alt={item.title} />
								<span>{item.title}</span>
							</li>
						))}
					</ul>
				</fieldset>
				<button type="submit">Cadastrar ponto de coleta</button>
			</form>
		</div>
	);
};

export default CreatePoint;
