

class MainPage {
   inputForSearch = '#input_for_search'; 
   searchButton = '#search_button';
   moviesSwiper = '#swiper-wrapper02';
   searchHeading = '#search_reasult_heading';

    visitMain():void {
    cy.visit(`${Cypress.env('baseURL')}/main.html`)
   }; 

   insertSearchItem(item:string) {
      cy.get(Main.inputForSearch).type(item);
        cy.get(Main.searchButton).click();
   }

   clearSearch():void {
      cy.clearAllCookies;
      cy.clearAllLocalStorage;
      cy.clearAllSessionStorage;
      cy.clearCookies;
  
   }

 
 
}

export const Main = new MainPage();