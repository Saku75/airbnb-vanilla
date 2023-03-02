import "../styles/global.scss";
import "../styles/destination.scss";

import Destination from "./types/destination";

(() => {
	const image = document.getElementById("image") as HTMLImageElement;
	const destination = document.getElementById("destination");
	const title = document.getElementById("title");
	const subtitle = document.getElementById("subtitle");
	const text = document.getElementById("text");
	const facilities = document.getElementById("facilities");

	const favorite = document.getElementById("favorite");
	const favoriteImage = document.querySelector(
		"#favorite img"
	) as HTMLImageElement;

	const id = new URLSearchParams(window.location.search).get("id");

	favorite?.addEventListener("click", () => {
		const favorites = JSON.parse(
			localStorage.getItem("favorites") || "[]"
		) as number[];

		if (favorites.includes(Number(id))) {
			favorites.splice(favorites.indexOf(Number(id)), 1);
			favoriteImage!.src = "/heart-outline.svg";
		} else {
			favorites.push(Number(id));
			favoriteImage!.src = "/heart-filled.svg";
		}

		localStorage.setItem("favorites", JSON.stringify(favorites));
	});

	fetch(`https://airbnb-next.lvmann.dk/api/destinations/${id}`)
		.then(response => response.json())
		.then(responseJSON => {
			const data = responseJSON.data as Destination;

			document.title = data.title;

			image!.src = `https://airbnb-next.lvmann.dk/img/${data.image}`;
			image!.alt = data.title;
			destination!.innerText = data.destination as string;
			title!.innerText = data.title;
			subtitle!.innerText = data.subtitle as string;
			text!.innerText = data.text as string;

			data.facilities!.forEach(facility => {
				const facilityElement = document.createElement("li");
				facilities!.appendChild(facilityElement);
				facilityElement.innerText = facility;
			});
		});
})();
