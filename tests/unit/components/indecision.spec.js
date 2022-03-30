import { shallowMount } from "@vue/test-utils";
import Indecision from "@/components/Indecision";

describe("Pruebas en Indecision", () => {
  let wrapper = shallowMount(Indecision);
  let clgSpy;

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          answer: "yes",
          forced: false,
          image: "https://yesno.wtf/assets/yes/2.gif",
        }),
    })
  );

  beforeEach(() => {
    wrapper = shallowMount(Indecision);
    clgSpy = jest.spyOn(console, "log");

    jest.clearAllMocks();
  });

  test("Debe mostrarse correctamente", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("Escribir en el input no debe de disparar nada (console.log)", async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");
    const input = wrapper.find("input");
    await input.setValue("Hola Mundo");

    expect(clgSpy).toHaveBeenCalled();
    expect(getAnswerSpy).not.toHaveBeenCalled();
  });

  test('Escribir el simbolo de "?" debe de disparar el getAnswer', async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");
    const input = wrapper.find("input");
    await input.setValue("Hola Mundo?");

    expect(getAnswerSpy).toHaveBeenCalled();
  });

  test("Pruebas en getAnswer", async () => {
    await wrapper.vm.getAnswer();

    const img = wrapper.find("img");

    expect(img.exists()).toBeTruthy();
    expect(wrapper.vm.img).toBe("https://yesno.wtf/assets/yes/2.gif");
    expect(wrapper.vm.answer).toBe("Si!");
  });

  test("pruebas en getAnswer - Fallo en el api", async () => {
    fetch.mockImplementationOnce(() => {
      return Promise.reject("API is down");
    });

    await wrapper.vm.getAnswer();

    const img = wrapper.find("img");
    expect(img.exists()).toBeFalsy();
    expect(wrapper.vm.answer).toBe("No se pudo cargar el API!");
  });
});
