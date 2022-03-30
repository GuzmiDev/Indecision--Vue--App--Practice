import { shallowMount } from "@vue/test-utils";
import Counter from "@/components/Counter";

describe("Counter Component", () => {
  test("Debe mostrarse correctamente", () => {
    const wrapper = shallowMount(Counter);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
