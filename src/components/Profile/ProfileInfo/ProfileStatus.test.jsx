import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status="my test STATUS" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("my test STATUS");
  });
  test("after creation <span> should be display with correct status", () => {
    const component = create(<ProfileStatus status="my test STATUS" />);
    const root = component.root;
    const span = root.findByType("span");
    expect(span.children.length).toBe(1);
  });
  test("after creation <input> shouldn't be displayed", () => {
    const component = create(<ProfileStatus status="my test STATUS" />);
    const root = component.root;
    expect(() => {
      const input = root.findByType("input");
    }).toThrow();
  });
  test("after creation <span> should be display with correct status text", () => {
    const component = create(<ProfileStatus status="my test STATUS" />);
    const root = component.root;
    const span = root.findByType("span");
    expect(span.props.children).toBe("my test STATUS");
  });
  test("input should be displayed in editMode instead of span", () => {
    const component = create(<ProfileStatus status="my test STATUS" />);
    const root = component.root;
    const span = root.findByType("span");
    span.props.onDoubleClick();
    const input = root.findByType("input");
    expect(input.props.value).toBe("my test STATUS");
  });
  test("callback should be called", () => {
    const mockCallback = jest.fn();
    const component = create(
      <ProfileStatus status="my test STATUS" updateStatus={mockCallback} />
    );
    const instance = component.getInstance();
    instance.deactivateEditMode();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
