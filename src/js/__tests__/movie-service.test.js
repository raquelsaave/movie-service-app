
import MovieService from "../services/movie-service.js";


describe("MovieService", () => {
	let movieService;
	beforeAll(() => {
		movieService = new MovieService();
	});

	test("should be and instance of a class", () => {
		expect(movieService).toBeDefined();
	});

	// Test getGenres
	it("should return an array of all genres available", () => {
		return movieService.getGenres()
			.then((data) => {
				expect(data.genres.length).not.toEqual(0)
			});
	});

	// Test getMoviesbyGenre
	it("should return a movie list based on genre", () => {
		return movieService.getMoviesbyGenre("28")
			.then((data) => {
				let genreList = data.results[0].genre_ids
				expect(genreList).toContain(28)
			});
	});

	it("should NOT return a movie list based on genre", () => {
		return movieService.getMoviesbyGenre(null)
			.then((data) => {
				expect(data.results.length).toEqual(0)
			});
	});

	// Test getMoviesbyPopularity
	it("should return an array of movies by popularity", () => {
		return movieService.getMoviesbyPopularity()
			.then((data) => {
				expect(data.results.length).not.toEqual(0)
			});
	});

	// Test getTrending
	it("should return an array of movies trending", () => {
		return movieService.getTrending("all","day")
			.then((data) => {
				expect(data.results.length).not.toEqual(0)
			});
	});

	it("should NOT return successful result on null parameters", () => {
		return movieService.getTrending(null,null)
			.then((data) => {
				expect(data.success).toBe(false)
			});
	});

});
