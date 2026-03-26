describe('Theme System', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/');
  });

  it('should have a theme toggle button in the header', () => {
    cy.get('.btn-theme-toggle').should('exist');
  });

  it('should toggle theme when clicking the button', () => {
    // Initially should be light mode (or system preference, we assume light for test by default if not set)
    // We can clear localStorage to be sure
    cy.clearLocalStorage();
    cy.visit('/');

    // Check light mode
    cy.get('html').should('not.have.class', 'dark');

    // Click toggle
    cy.get('.btn-theme-toggle').click();

    // Check dark mode
    cy.get('html').should('have.class', 'dark');
    
    // Check localStorage
    cy.window().then((win) => {
      expect(win.localStorage.getItem('theme')).to.equal('dark');
    });

    // Click toggle again
    cy.get('.btn-theme-toggle').click();

    // Check light mode
    cy.get('html').should('not.have.class', 'dark');
    
    // Check localStorage
    cy.window().then((win) => {
      expect(win.localStorage.getItem('theme')).to.equal('light');
    });
  });

  it('should persist theme across reloads', () => {
    cy.get('.btn-theme-toggle').click();
    cy.get('html').should('have.class', 'dark');

    cy.reload();
    cy.get('html').should('have.class', 'dark');
  });

  it('should have correct background and text colors in dark mode', () => {
    // Set to dark mode
    cy.get('.btn-theme-toggle').click();
    cy.get('html').should('have.class', 'dark');

    // Verify background color of body
    cy.get('body').should('have.css', 'background-color', 'rgb(18, 18, 18)'); // #121212
    
    // Verify text color of body
    cy.get('body').should('have.css', 'color', 'rgb(224, 224, 224)'); // #e0e0e0
  });
});
