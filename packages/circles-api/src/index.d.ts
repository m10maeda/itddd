export interface paths {
  '/{id}/members': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['CircleController_addMember'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/{id}/owner': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put: operations['CircleController_changeOwner'];
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/{id}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['CircleController_getBy'];
    put: operations['CircleController_update'];
    post?: never;
    delete: operations['CircleController_delete'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['CircleController_findAllBy'];
    put?: never;
    post: operations['CircleController_register'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/{id}/candidates': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['CircleController_getCandidatesBy'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/{id}/members/{memberId}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    delete: operations['CircleController_removeMember'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    AddMemberDto: {
      /** @example 2 */
      id: string;
    };
    ChangeOwnerDto: {
      /** @example 2 */
      id: string;
    };
    RegisterCircleDto: {
      /** @example Baseball */
      name: string;
      /** @example 1 */
      owner: string;
    };
    RenameCircleDto: {
      /** @example Football */
      name: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  CircleController_addMember: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['AddMemberDto'];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  CircleController_changeOwner: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['ChangeOwnerDto'];
      };
    };
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  CircleController_getBy: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  CircleController_update: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['RenameCircleDto'];
      };
    };
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  CircleController_delete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  CircleController_findAllBy: {
    parameters: {
      query?: {
        page?: number;
        size?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  CircleController_register: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['RegisterCircleDto'];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  CircleController_getCandidatesBy: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  CircleController_removeMember: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        id: string;
        memberId: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
}
