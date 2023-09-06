import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";

const waitForElement = async (text) => {
  await waitFor(() => {
    const element = screen.queryByText(text);
    if (element) {
      expect(element).toBeInTheDocument();
    } else {
      throw new Error(`Element with text "${text}" not found.`);
    }
  });
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
        })
      );

      await waitForElement("En cours");
      await waitForElement("Message envoyé !");
    });
  });
});

describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    // à implémenter
  });
  it("a list of people is displayed", () => {
    // à implémenter
  });
  it("a footer is displayed", () => {
    // à implémenter
  });
  it("an event card, with the last event, is displayed", () => {
    // à implémenter
  });
});
