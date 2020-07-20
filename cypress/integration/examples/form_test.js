describe('form test', ()=>{
    it('test that the from is working', ()=>{
        cy.visit('/pizza')

        cy.get('button#submit')
        .should('be.disabled')

        const name= "Anna Davis"
        cy.get('[for="name"]>input')
        .type(name)
        .should('have.value', name)

        const instructions = "Testing"
        cy.get('textarea')
        .type(instructions)
        .should('have.value', instructions)

        cy.get('[data-cy="olive"]> input')
        .click()
        .should('have.checked', true)

        cy.get('[data-cy="beef"]> input')
        .click()
        .should('have.checked', true)

        cy.get('[data-cy="onion"]> input')
        .click()
        .should('have.checked', true)

        cy.get('[data-cy="ham"]> input')
        .click()
        .should('have.checked', true)

        

        




    })
})