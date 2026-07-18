import { fireEvent, render, screen, within } from "@testing-library/react";
import Home from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
  focus: [],
  events: [
    {
      id: 1,
      type: "forum",
      date: "2022-01-01T20:28:45.744Z",
      title: "Ancien événement",
      cover: "/images/old-event.png",
      description: "desc",
      nb_guesses: 100,
      periode: "Janvier",
      prestations: [],
    },
    {
      id: 2,
      type: "forum",
      date: "2026-12-01T20:28:45.744Z",
      title: "Nouvel événement",
      cover: "/images/new-event.png",
      description: "desc",
      nb_guesses: 500,
      periode: "Décembre",
      prestations: [],
    },
  ],
};

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        }),
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });
});

describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    // to implement
  });
  it("a list a people is displayed", () => {
    // to implement
  });
  it("a footer is displayed", () => {
    // to implement
  });

  it("an event card, with the last event, is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(data);
    const { container } = render(
      <DataProvider>
        <Home />
      </DataProvider>,
    );

    const footer = container.querySelector(".col.presta");
    expect(
      await within(footer).findByText("Nouvel événement"),
    ).toBeInTheDocument();
    expect(within(footer).getByText("décembre")).toBeInTheDocument();
  });
});
