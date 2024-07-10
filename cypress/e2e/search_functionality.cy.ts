import { Main } from "../pages/main";

describe('Search functionality', () => {
    

    beforeEach(() => {
     Main.visitMain();
     Main.clearSearch();
        // Assertions
        cy.title().should('contain', 'Lixxy');
        cy.url().should('contain', 'https://lixxy-webpack-n76b.vercel.app/main.html');
    });

    it('&000001 - Verify correct API response with valid data (num of results over 100)', () => {
        const title = 'titanic';
       cy.intercept('GET', `https://api.themoviedb.org/3/search/movie?api_key=afbf7cca056ce2daed661a5d429faeeb&language=en-US&query=${title}&page=1`).as('Data01');
        cy.request('GET', `https://api.themoviedb.org/3/search/movie?api_key=afbf7cca056ce2daed661a5d429faeeb&language=en-US&query=${title}&page=1`).then((response) => {
            const requestLength = response.body.results.length;
            cy.wrap(requestLength).as('reqLength');
        });

        Main.insertSearchItem('titanic');

        cy.wait('@Data01').then((interception) => {
         
            const responseBody = interception.response.body;
          
            // Assertions
            expect(interception.response.statusCode).to.eql(200);
            expect(interception.response.statusMessage).to.eql('OK');
            

            // Compare the length of results
            cy.get('@reqLength').then((length) => {
               
            expect(responseBody.results.length).to.eql(length);
               
               
            });
            cy.get(Main.moviesSwiper).children().should('have.length',100);
            cy.get(Main.searchHeading).should('contain', 100);
            cy.get(Main.searchHeading).should('contain', title);
            cy.url().should('contain', 'https://lixxy-webpack-n76b.vercel.app/searchPage');
        });
    });
    it('&000002 - Verify correct API response with valid data (UPPERCASE) (num of results over 100)', () => {
        const title = 'TITANIC';
        cy.intercept('GET', `https://api.themoviedb.org/3/search/movie?api_key=afbf7cca056ce2daed661a5d429faeeb&language=en-US&query=${title}&page=1`).as('Data01');
        cy.request('GET', `https://api.themoviedb.org/3/search/movie?api_key=afbf7cca056ce2daed661a5d429faeeb&language=en-US&query=${title}&page=1`).then((response) => {
            const requestLength = response.body.results.length;
            cy.wrap(requestLength).as('reqLength');
           
        });

        Main.insertSearchItem(title);

        cy.wait('@Data01').then((interception) => {
            // Log only necessary parts of the response to avoid circular references
            const responseBody = interception.response.body;
          
            // Assertions
            expect(interception.response.statusCode).to.eql(200);
            expect(interception.response.statusMessage).to.eql('OK');
            

            // Compare the length of results
            cy.get('@reqLength').then((length) => {
               
            expect(responseBody.results.length).to.eql(length);
               
               
            });
            cy.get(Main.moviesSwiper).children().should('have.length',100);
            cy.get(Main.searchHeading).should('contain', 100);
            cy.get(Main.searchHeading).should('contain', title);
            cy.url().should('contain', 'https://lixxy-webpack-n76b.vercel.app/searchPage');
        });
    });

    it('&000003 - Verify correct API response with invalid empty search input', () => {
        const title = ' ';
       
        cy.request('GET', `https://api.themoviedb.org/3/search/movie?api_key=afbf7cca056ce2daed661a5d429faeeb&language=en-US&query=${title}&page=1`).then((response) => {
            const requestLength = response.body.results.length;
            cy.wrap(requestLength).as('reqLength');
            expect(response.body.total_results).to.eql(0);
        });

        Main.insertSearchItem(title);

       
        cy.on('window:alert', (message)=>{
            expect(message).to.eql('Write your search title, please, and check the movie or TV section!');
        })
        cy.get(Main.moviesSwiper).children().should('not.exist');
        cy.get(Main.searchHeading).should('contain', '0');
        cy.get(Main.searchHeading).should('contain', title);
        cy.url().should('contain', 'https://lixxy-webpack-n76b.vercel.app/searchPage');
    });

    it('&000004 - Mock API response with valid empty search input (num of results lower than 100)', () => {
        // Set up the intercept before any action that triggers the API request
        let title = 'nanuk';
        cy.intercept({
            method: 'GET',
            url: `https://api.themoviedb.org/3/search/movie?api_key=afbf7cca056ce2daed661a5d429faeeb&language=en-US&query=${title}&page=1`,
        }, {
            statusCode: 200,
            body: {
                "page": 1,
                "results": [
                    {
                        "adult": false,
                        "backdrop_path": null,
                        "genre_ids": [
                            14,
                            878
                        ],
                        "id": 1195297,
                        "original_language": "fa",
                        "original_title": "افسانۀ کوه ننوک",
                        "overview": "A large meteorite hits the Sea of ​​Hormuz, and because of this, the fish in that area are genetically altered and can no longer be eaten, and a group is ordered by the government to close the sea. Due to extreme hunger, the people are forced to secretly catch fish from the sea. Unaware that eating these fishes may harm them.",
                        "popularity": 0.377,
                        "poster_path": "/7PKgWKdiIEGSq1FOQQoAXkCBsOX.jpg",
                        "release_date": "2023-10-20",
                        "title": "The Legend Of Nanuk Mountain",
                        "video": false,
                        "vote_average": 0.0,
                        "vote_count": 0
                    },
                   
                ]
            }
        }).as('getMovies'); 
    
        // Trigger the search action
       
        Main.insertSearchItem(title);
    
        // Wait for the intercepted request to complete before performing assertions
        cy.wait('@getMovies').then((interception) => {
            // Assertions to check the mock response was applied
            expect(interception.response.statusCode).to.eql(200);
            expect(interception.response.body.results).to.have.length(1);
        });
    
        // Check the number of displayed movies
        cy.get(Main.moviesSwiper).children().should('have.length', 1);
        cy.get(Main.searchHeading).should('contain', 1);
        cy.get(Main.searchHeading).should('contain', title);
        cy.url().should('contain', 'https://lixxy-webpack-n76b.vercel.app/searchPage');
    });
    

});
