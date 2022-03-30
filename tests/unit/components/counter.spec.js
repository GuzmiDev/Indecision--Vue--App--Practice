import { shallowMount } from "@vue/test-utils";
import Counter from "@/components/Counter";

describe("Counter Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Counter);
  });

  test("Debe mostrarse correctamente", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("h2 debe de tener el valor por defecto", () => {
    expect(wrapper.find("h2").exists()).toBeTruthy();

    const h2Value = wrapper.find("h2").text();

    expect(h2Value).toBe("Counter");
  });

  test("El valor por defecto debe de ser 100 en el parrafo", () => {
    // const parrafo = wrapper.findAll("p")[1];
    const parrafo = wrapper.find('[data-testid="counter"]');

    expect(parrafo.exists()).toBeTruthy;

    const pValue = parrafo.text();

    expect(pValue).toBe("100");
  });

  test("debe de incrementar y decrementar el valor del contador", async () => {
    const [decreaseBtn, increaseBtn] = wrapper.findAll("button");

    await increaseBtn.trigger("click");
    await increaseBtn.trigger("click");
    await increaseBtn.trigger("click");
    await decreaseBtn.trigger("click");
    await decreaseBtn.trigger("click");

    const value = wrapper.find('[data-testid="counter"]').text();
    expect(value).toBe("101");
  });

  test("debe de establecer el valor por defecto", () => {
    const { start } = wrapper.props();
    const value = wrapper.find('[data-testid="counter"]').text();

    expect(Number(value)).toBe(start);
  });

  test("debe de mostrar la prop title", () => {
    const title = "Hola mundo";

    const wrapper = shallowMount(Counter, { props: { title } });

    expect(wrapper.find("h2").text()).toBe(title);
  });
});
