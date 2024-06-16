import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { AuthContext } from "../../context/authContext";
import { BrowserRouter as Router } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import register from "../../../public/locales/en/pages.json";

import Register from "./Register";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: register
        }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
});

const mock = new MockAdapter(axios);

describe("Register component", () => {
    beforeEach(() => {
        mock.reset();
    });

    const renderComponent = () =>
        render(
            <I18nextProvider i18n={i18n}>
                <AuthContext.Provider value={{ dispatch: jest.fn() }}>
                    <Router>
                        <Register />
                    </Router>
                </AuthContext.Provider>
            </I18nextProvider>
        );

    test("renders Register component correctly", () => {
        renderComponent();
        expect(screen.getByPlaceholderText(/firstName/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/lastName/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/phoneNumber/i)).toBeInTheDocument();
    });

    test("handles form field changes and validates input fields", async () => {
        renderComponent();

        fireEvent.change(screen.getByPlaceholderText(/firstName/i), { target: { value: "John" } });
        expect(screen.getByPlaceholderText(/firstName/i)).toHaveValue("John");

        fireEvent.change(screen.getByPlaceholderText(/lastName/i), { target: { value: "Doe" } });
        expect(screen.getByPlaceholderText(/lastName/i)).toHaveValue("Doe");

        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "invalid email" } });
        expect(screen.getByPlaceholderText(/email/i)).toHaveValue("invalid email");

        fireEvent.change(screen.getByPlaceholderText(/phoneNumber/i), { target: { value: "12345" } });
        expect(screen.getByPlaceholderText(/phoneNumber/i)).toHaveValue("12345");

        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: "short" } });
        expect(screen.getByPlaceholderText(/password/i)).toHaveValue("short");

        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "john.doe@example.com" } });
        expect(screen.getByPlaceholderText(/email/i)).toHaveValue("john.doe@example.com");
    });

    test("prevents form submission with invalid data", async () => {
        renderComponent();

        fireEvent.change(screen.getByPlaceholderText(/firstName/i), { target: { value: "John" } });
        fireEvent.change(screen.getByPlaceholderText(/lastName/i), { target: { value: "Doe" } });

        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "invalid email" } });

        fireEvent.change(screen.getByPlaceholderText(/phoneNumber/i), { target: { value: "12345" } });

        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: "short" } });

        fireEvent.submit(screen.getByRole("button", { name: /register.link_registration/i }));

        expect(screen.queryByText(/Form data is valid, submitting.../i)).not.toBeInTheDocument();
    });
    test("submits form data to the server on successful validation", async () => {
        renderComponent();

        fireEvent.change(screen.getByPlaceholderText(/firstName/i), { target: { value: "John" } });
        fireEvent.change(screen.getByPlaceholderText(/lastName/i), { target: { value: "Doe" } });
        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "john.doe@example.com" } });
        fireEvent.change(screen.getByPlaceholderText(/phoneNumber/i), { target: { value: "+380501234567" } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: "StrongPassword123" } });

        fireEvent.submit(screen.getByRole("button", { name: /register.link_registration/i }));

        await waitFor(() => {
            expect(mock.history.post.length).toBe(1);
            expect(mock.history.post[0].data).toEqual(expect.stringContaining("john.doe@example.com"));
        });
    });
});
