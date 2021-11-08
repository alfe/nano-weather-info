/// <reference types="cypress" />

const API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_hours&timezone=Asia%2FTokyo';
describe('api get test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  xit('check get request', () => {
    cy.wait(5000)
    cy.intercept('GET', API_URL).as('get_todo')
    cy.contains('refresh').click();
    cy.wait('@get_todo').then((xhr) => {
      console.log(xhr)
      expect(xhr.response.statusCode).to.eq(200);
    });
  })

  xit('send api', () => {
    cy.request({
      url: API_URL,
      method: "GET",
      headers: {
        accept: 'application/json',
      },
    }).should((response) => {
      console.log(API_URL, response.body)
    })
  })
})
