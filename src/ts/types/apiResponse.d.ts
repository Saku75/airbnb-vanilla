export default interface ApiResponse {
	/**
	 * The status code for the response.
	 */
	statusCode: number;
	/**
	 * The status message for the response.
	 */
	statusMessage: string;
	/**
	 * The data for the response.
	 */
	data?: [] | {} | null;
	/**
	 * The timestamp for the response.
	 */
	timestamp: string;
}
