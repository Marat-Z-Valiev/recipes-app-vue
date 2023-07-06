import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import RecipesListView from "../../views/RecipesListView.vue";

describe("RecipesListView", () => {
  it("renders properly", () => {
    const wrapper = mount(RecipesListView);
    expect(wrapper.text()).toContain("List of recipes");
  });
});
