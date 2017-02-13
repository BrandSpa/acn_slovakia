import objToFormData from "../../lib/obj_to_formdata";

describe("lib object to formdata ", () => {
  it("should convert a object to formdata", () => {
    let data = objToFormData({ name: "ale", lastname: "san" });
    let expected = new FormData();
    expected.append("name", "ale");
    expected.append("lastname", "san");
    expect(data).toEqual(expected);
  });
});
