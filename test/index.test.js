//関数のテスト
describe('test', () => {
   it('should return true', () => {
      expect(test()).toBe(true);
   });
}
   
// Path: src/index.js
//関数の実装
export default function test() {
   return true;
}
//2次元配列を1次元配列に変換する関数
export function flatten(arr) {
   return arr.reduce((acc, val) => acc.concat(val), []);
}
//firestoreのテストのためのモック
export const mockFirestore = {
   collection: jest.fn(() => mockFirestore),
   doc: jest.fn(() => mockFirestore),
   set: jest.fn(() => mockFirestore),
   get: jest.fn(() => mockFirestore),
   onSnapshot: jest.fn(() => mockFirestore),
   where: jest.fn(() => mockFirestore),
   orderBy: jest.fn(() => mockFirestore),
   limit: jest.fn(() => mockFirestore),
   startAfter: jest.fn(() => mockFirestore),
   endBefore: jest.fn(() => mockFirestore),
   onSnapshot: jest.fn(() => mockFirestore),
   
}
//firebaseのテスト
describe('firebase', () => {
   it('should return true', () => {
      expect(firebase).toBeTruthy();
   });
}
//firestoreのテスト
describe('firestore', () => {
   it('should return true', () => {
      expect(firestore).toBeTruthy();
   });
}
