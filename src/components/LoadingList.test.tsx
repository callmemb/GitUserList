import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LoadingList from "./LoadingList";

describe("LoadingList", () => {
  it("ItemRender use items from list", async () => {
    const labels = ["item-a", "item-b", "item-c"];
    const app = render(
      <LoadingList
        list={labels.map((label) => ({ label }))}
        isLoading={false}
        loadingRender={<div>loading</div>}
        itemRender={(item) => (
          <div data-testid="item" key={item.label}>
            {item.label}
          </div>
        )}
        noResultsRender={<div>no result</div>}
      />
    );
    const items = await app.queryAllByTestId("item");
    expect(items.map((item) => item.textContent)).toEqual(labels);
  });

  describe("Checking displayed elements", () => {
    it("multiple list items", async () => {
      const app = render(
        <LoadingList
          list={[{ label: "item-a" }, { label: "item-b" }]}
          isLoading={false}
          loadingRender={<div data-testid="loading">loading</div>}
          itemRender={(item) => (
            <div data-testid="item" key={item.label}>
              item
            </div>
          )}
          noResultsRender={<div data-testid="noresult">no result</div>}
        />
      );
      const loading = await app.queryAllByTestId("loading");
      const noResult = await app.queryAllByTestId("noresult");
      const items = await app.queryAllByTestId("item");
      expect(loading.length).toBe(0);
      expect(noResult.length).toBe(0);
      expect(items.length).toBe(2);
    });
    it("empty list", async () => {
      const app = render(
        <LoadingList
          list={[]}
          isLoading={false}
          loadingRender={<div data-testid="loading">loading</div>}
          itemRender={() => <div data-testid="item">item</div>}
          noResultsRender={<div data-testid="noresult">no result</div>}
        />
      );
      const loading = await app.queryAllByTestId("loading");
      const noResult = await app.queryAllByTestId("noresult");
      const items = await app.queryAllByTestId("item");
      expect(loading.length).toBe(0);
      expect(noResult.length).toBe(1);
      expect(items.length).toBe(0);
    });
    it("loading element", async () => {
      const app = render(
        <LoadingList
          list={[{ label: "asd" }]}
          isLoading={true}
          loadingRender={<div data-testid="loading">loading</div>}
          itemRender={(item) => (
            <div data-testid="item" key={item.label}>
              item
            </div>
          )}
          noResultsRender={<div data-testid="noresult">no result</div>}
        />
      );
      const loading = await app.queryAllByTestId("loading");
      const noResult = await app.queryAllByTestId("noresult");
      const items = await app.queryAllByTestId("item");
      expect(loading.length).toBe(1);
      expect(noResult.length).toBe(0);
      expect(items.length).toBe(1);
    });
  });
});
