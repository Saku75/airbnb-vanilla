import "../styles/global.scss";
import "../styles/destination-list.scss";

import Destination from "./types/destination";
import ApiResponse from "./types/apiResponse";

(() => {
	const destinationList = document.querySelector("#list");

	const observer = new IntersectionObserver(fetchDestination, {
		root: null,
		rootMargin: "0px",
		threshold: 1.0,
	});

	let list: Destination[] = [];

	// Creates a card with the given data and appends it to the given container.
	function createCard(cardData: Destination, container: Element) {
		const card = document.createElement("li");
		container.appendChild(card);
		card.className = "card";
		card.dataset.id = cardData.id.toString();

		const cardImage = document.createElement("img");
		card.appendChild(cardImage);
		cardImage.src = `https://airbnb-next.lvmann.dk/img/${cardData.image}`;
		cardImage.alt = cardData.title;

		const cardContent = document.createElement("div");
		card.appendChild(cardContent);

		const cardButton = document.createElement("button");
		cardContent.appendChild(cardButton);

		const cardButtonImage = document.createElement("img");
		cardButton.appendChild(cardButtonImage);
		const favorites = JSON.parse(
			localStorage.getItem("favorites") || "[]"
		) as number[];
		if (favorites.includes(cardData.id)) {
			cardButtonImage.src = "/heart-filled.svg";
		} else {
			cardButtonImage.src = "/heart-outline.svg";
		}
		cardButtonImage.alt = "Add to favorites";

		cardButton.addEventListener("click", () => {
			const favorites = JSON.parse(
				localStorage.getItem("favorites") || "[]"
			) as number[];

			if (favorites.includes(cardData.id)) {
				favorites.splice(favorites.indexOf(cardData.id), 1);
				cardButtonImage.src = "/heart-outline.svg";
			} else {
				favorites.push(cardData.id);
				cardButtonImage.src = "/heart-filled.svg";
			}

			localStorage.setItem("favorites", JSON.stringify(favorites));
		});

		const cardLink = document.createElement("a");
		cardContent.appendChild(cardLink);
		cardLink.href = `/destination.html?id=${cardData.id}`;
		cardLink.textContent = "More";

		return card;
	}

	// Returns an array of all the ids of the destinations in the given list.
	function listIds(list: Destination[]) {
		return list.map(destination => destination.id);
	}

	// Fetch the next destination from the server.
	async function fetchDestination(entries?: IntersectionObserverEntry[]) {
		if (entries) {
			entries.forEach(entry => {
				observer.unobserve(entry.target);
			});
		}

		const response = await fetch(
			"https://airbnb-next.lvmann.dk/api/destinations",
			{
				method: "GET",
				headers: {
					exclude: listIds(list).join(","),
					limit: "1",
				},
			}
		);

		if (response.ok) {
			const responseJSON: ApiResponse = await response.json();

			const data = responseJSON.data as Destination[];

			if (destinationList && data.length > 0) {
				list.push(data[0]);

				const card = createCard(data[0], destinationList);

				observer.observe(card);
			}
		}
	}

	if (destinationList) {
		fetchDestination();
	}
})();
