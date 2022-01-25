import {URL_BASE, URL_INGREDIENTS, URL_POST_LOGIN, URL_POST_ORDER} from "../../../src/utils/const";

describe('service is available', function () {

    before(function () {
        cy.visit('http://localhost:3000');

        cy.intercept('GET', `${URL_BASE}${URL_INGREDIENTS}`, {fixture: 'ingredient-list.json'}).as('getMethods')
    });

    it('should test drag and drop burger ingredients', function () {

        cy.get('[data-cy=DragItem]').first().as('bun');

        cy.get('[data-cy=DragItem]').should('have.length', 15);

        cy.get('@bun')
            .trigger('dragstart');
        cy.get('[data-cy=productBox]').trigger('drop');


        cy.get('[data-cy=DragItem]').eq(3).as('sauce');

        cy.get('@sauce')
            .trigger('dragstart');

        cy.get('[data-cy=productBox]').trigger('drop');
        cy.get('[data-cy=DragItem]').eq(4).as('sauce2');

        cy.get('@sauce2')
            .trigger('dragstart');

        cy.get('[data-cy=productBox]').trigger('drop');


        cy.get('[data-cy=DragItem]').eq(7).as('meat');

        cy.get('@meat')
            .trigger('dragstart');

        cy.get('[data-cy=productBox]').trigger('drop');

    });

    it('should be show ingredients details', function () {

        cy.get('[data-cy=DragItem]').first().as('bun');
        cy.get('@bun')
            .trigger('click');

        cy.get('[data-cy=IngredientDetails_name]').should('contain', 'Краторная булка N-200i')
        cy.get('[data-cy=IngredientDetails_calories]').should('contain', '420')
        cy.get('[data-cy=IngredientDetails_proteins]').should('contain', '80')
        cy.get('[data-cy=IngredientDetails_fat]').should('contain', '24')
        cy.get('[data-cy=IngredientDetails_carbohydrates]').should('contain', '53')

        cy.get("body").click(0, 0)

        cy.get('[data-cy=IngredientDetails_name]').should('not.exist');
    });

    it('should be create order', function () {

        const userLogin = 'vaspeyukne@vusra.com';
        const userPassword = '12345678';

        cy.get('button').contains('Оформить заказ').click();

        cy.get('[name^=emailInput]').first().as('emailInput');
        cy.get("@emailInput").type(userLogin);

        cy.get('[name^=passwordInput]').first().as('passwordInput');
        cy.get("@passwordInput").type(userPassword);

        cy.intercept('POST', `${URL_BASE}${URL_POST_LOGIN}`, {fixture: 'login-response.json'}).as('postLoginMethods');
        cy.get("button").contains("Войти").click();

        cy.wait(1000);

        cy.intercept('POST', `${URL_BASE}${URL_POST_ORDER}`, {fixture: 'order-response.json'}).as('postOrderMethods');
        cy.get('button').contains('Оформить заказ').click();

        cy.get('[data-cy=OrderDetails_Id]').should('contain', '8807');

    });

    it('should be close order details', function () {
        cy.get("body").click(0, 0)
        cy.get('[data-cy=OrderDetails_Id]').should('not.exist');
    })
});
