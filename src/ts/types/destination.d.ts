/**
 * The interface for a destination.
 */
export default interface Destination {
	/**
	 * The unique identifier for the destination.
	 */
	id: number;
	/**
	 * The image for the destination.
	 */
	image: string;
	/**
	 * The destination.
	 */
	destination?: string;
	/**
	 * The title for the destination.
	 */
	title: string;
	/**
	 * The subtitle for the destination.
	 */
	subtitle?: string;
	/**
	 * The text for the destination.
	 */
	text?: string;
	/**
	 * The facilities for the destination.
	 */
	facilities?: string[];
}
