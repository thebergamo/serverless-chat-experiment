import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { getKey, getUser, prefixKey, saveKey, saveUser } from "./storage";

describe("service/storage.ts", () => {
  describe("prefixKey", () => {
    it("should return key with app prefix", () => {
      expect(prefixKey("myKey")).toBe("test_myKey");
    });
  });

  const LocalStorage = {
    setItem: vi.fn(),
    getItem: vi.fn(),
  };

  beforeAll(() => {
    vi.stubGlobal("localStorage", LocalStorage);
  });

  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("saveKey", () => {
    it("should store string object as it is", () => {
      expect(saveKey("mark", "test")).toBeUndefined();
      expect(LocalStorage.setItem).toBeCalledTimes(1);
      expect(LocalStorage.setItem).toBeCalledWith(
        expect.stringContaining("mark"),
        "test"
      );
    });

    it("should store object as json string", () => {
      expect(saveKey("mark", { test: "mark" })).toBeUndefined();
      expect(LocalStorage.setItem).toBeCalledTimes(1);
      expect(LocalStorage.setItem).toBeCalledWith(
        expect.stringContaining("mark"),
        '{"test":"mark"}'
      );
    });
  });

  describe("getKey", () => {
    it("should retrieve value as string", () => {
      LocalStorage.getItem.mockReturnValueOnce("test1");
      expect(getKey("mark")).toBe("test1");
      expect(LocalStorage.getItem).toBeCalledTimes(1);
      expect(LocalStorage.getItem).toBeCalledWith(
        expect.stringContaining("mark")
      );
    });
    it("should retrieve value as object", () => {
      LocalStorage.getItem.mockReturnValueOnce('{"mark":"test1"}');
      expect(getKey("mark")).toEqual({ mark: "test1" });
      expect(LocalStorage.getItem).toBeCalledTimes(1);
      expect(LocalStorage.getItem).toBeCalledWith(
        expect.stringContaining("mark")
      );
    });
    it("should return stored string when stored string is not valid object", () => {
      LocalStorage.getItem.mockReturnValueOnce('{"mark":"test1"');
      expect(getKey("mark")).toEqual('{"mark":"test1"');
      expect(LocalStorage.getItem).toBeCalledTimes(1);
      expect(LocalStorage.getItem).toBeCalledWith(
        expect.stringContaining("mark")
      );
    });
  });

  describe("user storage", () => {
    it("should store user data", () => {
      expect(saveUser({ id: "test1", name: "mark" })).toBeUndefined();
      expect(LocalStorage.setItem).toBeCalledTimes(1);
    });
    it("should retrieve user when stored previously", () => {
      LocalStorage.getItem.mockReturnValueOnce('{"id":"test1","name":"mark"}');
      expect(getUser()).toEqual({ id: "test1", name: "mark" });
      expect(LocalStorage.getItem).toBeCalledTimes(1);
    });
    it("should return undefined when user is missing in storage", () => {
      expect(getUser()).toBeUndefined();
      expect(LocalStorage.getItem).toBeCalledTimes(1);
    });
  });
});
