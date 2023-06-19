describe("dragging ingredients into constructor works correctly", () => {
  beforeEach(() => {
    cy.seedAndVisit();
    cy.intercept("GET", "api/auth/user", { fixture: "test-user" });
    cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", {
      fixture: "test-order",
    });

    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
    cy.setCookie("accessToken", "test-accessToken");
  });

  it("should drag bun", () => {
    cy.get("[data-test='bun']")
      .contains("Краторная булка N-200i")
      .trigger("dragstart");
    cy.get("[data-test='drop-area']").trigger("drop");
    cy.get("[data-test='top-bun']")
      .contains("Краторная булка N-200i (верх)")
      .should("exist");
    cy.get("[data-test='bottom-bun']")
      .contains("Краторная булка N-200i (низ)")
      .should("exist");
  });

  it("should drag ingredients", () => {
    cy.get("[data-test='main']")
      .contains("Биокотлета из марсианской Магнолии")
      .trigger("dragstart");
    cy.get("[data-test='drop-area']").trigger("drop");
    cy.get("[data-test='filling']")
      .contains("Биокотлета из марсианской Магнолии")
      .should("exist");
  });

  it("should handle creating an order", () => {
    // Добавляем ингредиенты в конструктор, чтобы кнопка "Оформить заказ" разблокировалась"
    cy.get("[data-test='bun']")
      .contains("Краторная булка N-200i")
      .trigger("dragstart");
    cy.get("[data-test='drop-area']").trigger("drop");
    cy.get("[data-test='main']")
      .contains("Биокотлета из марсианской Магнолии")
      .trigger("dragstart");
    cy.get("[data-test='drop-area']").trigger("drop");

    // Нажимаем кнопку Оформить заказ
    cy.get("[data-test='confirm-container']")
      .contains("Оформить заказ")
      .as("orderBtn");
    cy.get("@orderBtn").click();

    // Проверяем есть ли в модальном окне номер заказа 9382
    cy.get("[data-test='order-details']").contains("9382").should("exist");
  });

  it("should handle closing order modal by clicking close btn", () => {
    // Добавляем ингредиенты в конструктор, чтобы кнопка "Оформить заказ" разблокировалась"
    cy.get("[data-test='bun']")
      .contains("Краторная булка N-200i")
      .trigger("dragstart");
    cy.get("[data-test='drop-area']").trigger("drop");
    cy.get("[data-test='main']")
      .contains("Биокотлета из марсианской Магнолии")
      .trigger("dragstart");
    cy.get("[data-test='drop-area']").trigger("drop");

    // Нажимаем кнопку Оформить заказ
    cy.get("[data-test='confirm-container']")
      .contains("Оформить заказ")
      .as("orderBtn");
    cy.get("@orderBtn").click();

    // Проверяем закрывает ли модальное окно при клике на кнопку закрыть
    cy.get("[data-test='modal-title']").find("#close-btn").as("closeBtn");
    cy.get("@closeBtn").click();
    cy.contains("Идентификатор заказа").should("not.exist");
  });

  it("should handle closing order modal by clicking on overlay", () => {
    // Добавляем ингредиенты в конструктор, чтобы кнопка "Оформить заказ" разблокировалась"
    cy.get("[data-test='bun']")
      .contains("Краторная булка N-200i")
      .trigger("dragstart");
    cy.get("[data-test='drop-area']").trigger("drop");
    cy.get("[data-test='main']")
      .contains("Биокотлета из марсианской Магнолии")
      .trigger("dragstart");
    cy.get("[data-test='drop-area']").trigger("drop");

    // Нажимаем кнопку Оформить заказ
    cy.get("[data-test='confirm-container']")
      .contains("Оформить заказ")
      .as("orderBtn");
    cy.get("@orderBtn").click();

    // Проверяем закрывает ли модальное окно при клике на Overlay
    cy.get("[data-test='modal-overlay']").as("modalOverlay");
    cy.get("@modalOverlay").click({ force: true });
    cy.contains("Идентификатор заказа").should("not.exist");
  });

  it("should handle closing order modal by pressing Esc", () => {
    // Добавляем ингредиенты в конструктор, чтобы кнопка "Оформить заказ" разблокировалась"
    cy.get("[data-test='bun']")
      .contains("Краторная булка N-200i")
      .trigger("dragstart");
    cy.get("[data-test='drop-area']").trigger("drop");
    cy.get("[data-test='main']")
      .contains("Биокотлета из марсианской Магнолии")
      .trigger("dragstart");
    cy.get("[data-test='drop-area']").trigger("drop");

    // Нажимаем кнопку Оформить заказ
    cy.get("[data-test='confirm-container']")
      .contains("Оформить заказ")
      .as("orderBtn");
    cy.get("@orderBtn").click();

    // Проверяем закрывает ли модальное окно при нажатии на Esc
    cy.get("body").type("{esc}");
    cy.contains("Идентификатор заказа").should("not.exist");
  });
});