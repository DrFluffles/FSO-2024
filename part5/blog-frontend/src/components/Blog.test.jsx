import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("clicking the button calls event handler once", async () => {
  const blog = {
    content: "Test Blog",
    author: "test author",
    url: "test.com",
    likes: 0,
  };
  const mockHandler = vi.fn();
  render(<Blog blog={blog} handleLike={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("Like");
  await user.click(button);
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
