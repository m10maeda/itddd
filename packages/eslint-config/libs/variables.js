/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  rules: {
    // For using private setter and public getter in class.
    // Because the same member name must specify the same accessibility.
    //
    // Example:
    //
    // ```ts
    // class Foo {
    //   private _foo: string;
    //
    //   public get foo(): string {
    //     return this._foo;
    //   }
    // }
    // ```
    //
    'no-underscore-dangle': [
      'error',
      {
        allowAfterThis: true,
        allowAfterSuper: true,
        enforceInMethodNames: true,
      },
    ],
  },
};
