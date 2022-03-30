import { shallowMount } from "@vue/test-utils";
import Counter from "@/components/Counter";

describe("Counter Component", () => {
  test("Debe mostrarse correctamente", () => {
    const wrapper = shallowMount(Counter);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("h2 debe de tener el valor por defecto", () => {
    const wrapper = shallowMount(Counter);

    expect(wrapper.find("h2").exists()).toBeTruthy();

    const h2Value = wrapper.find("h2").text();

    expect(h2Value).toBe("Counter");
  });

  test("El valor por defecto debe de ser 100 en el parrafo", () => {
    const wrapper = shallowMount(Counter);

    // const parrafo = wrapper.findAll("p")[1];
    const parrafo = wrapper.find('[data-testid="counter"]');

    expect(parrafo.exists()).toBeTruthy;

    const pValue = parrafo.text();

    expect(pValue).toBe("100");
  });
});
