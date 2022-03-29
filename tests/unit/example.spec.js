describe("Example Component", () => {
  test("Debe de ser mayor a 10", () => {
    // Arreglas
    let value = 10;

    // Estímulo
    value = value + 2;

    // Observar el resultado
    expect(value).toBeGreaterThan(10);
  });
});
