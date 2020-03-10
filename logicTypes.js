const statusOptions = [
  {value: "review", label: "Pending Review"},
  {value: "approved", label: "Approved"},
  {value: "correction", label: "Needs Correction"}
]

module.exports.NodeTypes = {
  output: {
    type: "output",
    label: "Record Attributes",
    addable: false,
    deletable: false,
    inputs: [
      {
        type: "string",
        label: "Title",
        name: "title",
        noControls: true
      },
      {
        type: "status",
        label: "Status",
        name: "status"
      },
      {
        type: "number",
        label: "Fee",
        name: "fee"
      }
    ]
  },
  number: {
    label: "Number",
    description: "Outputs a number.",
    type: "number",
    initialWidth: 130,
    inputs: [
      {
        type: 'number',
        name: 'number'
      }
    ],
    outputs: [
      {
        type: 'number',
        name: 'number'
      }
    ]
  },
  string: {
    label: "Text",
    description: "Outputs a string of text.",
    type: "string",
    inputs: [
      {
        type: 'string',
        name: 'string'
      }
    ],
    outputs: [
      {
        type: 'string',
        name: 'string'
      }
    ]
  },
  status: {
    type: "status",
    label: "Status",
    description: "Outputs a selected status",
    inputs: [
      {
        type: "status",
        label: "Selected Status",
        name: "statusValue",
        hidePort: true,
        controls: [
          {
            type: "select",
            placeholder: "[Select a Status]",
            name: "selectedStatus",
            options: statusOptions
          }
        ]
      }
    ],
    outputs: [
      {
        type: "status",
        label: "Status",
        name: "selectedStatus"
      }
    ]
  },
  and: {
    label: "And",
    description: "Outputs true if both values are true.",
    type: "and",
    initialWidth: 150,
    inputs: [
      {
        type: "boolean",
        name: "val1"
      },
      {
        type: "boolean",
        name: "val2"
      }
    ],
    outputs: [
      {
        type: 'boolean',
        name: 'output',
        label: 'True/False'
      }
    ]
  },
  or: {
    label: "Or",
    description: "Outputs true if either value is true.",
    initialWidth: 150,
    type: "or",
    inputs: [
      {
        type: "boolean",
        name: "val1"
      },
      {
        type: "boolean",
        name: "val2"
      }
    ],
    outputs: [
      {
        type: 'boolean',
        name: 'output',
        label: 'True/False'
      }
    ]
  },
  booleanReverse: {
    label: "Reverse Boolean",
    description: "Outputs the opposite of a true/false",
    initialWidth: 150,
    type: 'booleanReverse',
    inputs: [
      {
        type: "boolean",
        name: "boolean"
      }
    ],
    outputs: [
      {
        type: "boolean",
        name: "output"
      }
    ]
  },
  statusSwitch: {
    label: "Status Switch",
    description: "Outputs a status based on a given true/false input.",
    type: 'statusSwitch',
    inputs: [
      {
        type: "boolean",
        name: "test"
      },
      {
        type: "status",
        name: "statusIfTrue",
        label: "Status if true",
        controls: [
          {
            type: 'select',
            name: 'statusIfTrue',
            placeholder: "Status if True",
            options: statusOptions
          }
        ]
      },
      {
        type: "status",
        name: "statusIfFalse",
        label: "Status if false",
        controls: [
          {
            type: 'select',
            name: 'statusIfFalse',
            placeholder: "Status if False",
            options: statusOptions
          }
        ]
      }
    ],
    outputs: [
      {
        type: "status",
        name: "output"
      }
    ]
  },
  numberSwitch: {
    label: "Number Switch",
    description: "Outputs a number based on a given true/false input.",
    type: 'numberSwitch',
    initialWidth: 140,
    inputs: [
      {
        type: "boolean",
        name: "test"
      },
      {
        type: "number",
        name: "numberIfTrue",
        label: "Number if true"
      },
      {
        type: "number",
        name: "numberIfFalse",
        label: "Number if false"
      }
    ],
    outputs: [
      {
        type: "number",
        name: "output"
      }
    ]
  },
  user: {
    label: "User",
    description: "Outputs attributes of the current user.",
    type: 'user',
    inputs: [],
    outputs: [
      {
        type: "string",
        name: "firstName",
        label: "First Name"
      },
      {
        type: "string",
        name: "lastName",
        label: "Last Name"
      },
      {
        type: "boolean",
        name: "isAdmin",
        label: "Is Administrator"
      }
    ]
  },
  filingValue: {
    label: "Filing Value",
    description: "Outputs a value from the current filing",
    type: 'filingValue',
    inputs: [
      {
        type: "string",
        name: "fieldName",
        label: "Field Name"
      }
    ],
    outputs: [
      {
        type: "value",
        name: "value",
        label: "Field Value"
      }
    ]
  },
  valueEqualsValue: {
    label: "Values Equal",
    description: "Outputs whether two values equal each other.",
    type: 'valueEqualsValue',
    inputs: [
      {
        type: "value",
        name: "val1"
      },
      {
        type: "value",
        name: "val2"
      }
    ],
    outputs: [
      {
        type: "boolean",
        name: "output"
      }
    ]
  },
  valueEqualsText: {
    label: "Value Equals Text",
    description: "Outputs whether a value equals some given text.",
    type: 'valueEqualsText',
    inputs: [
      {
        type: "value",
        name: "val1"
      },
      {
        type: "string",
        name: "val2"
      }
    ],
    outputs: [
      {
        type: "boolean",
        name: "output"
      }
    ]
  },
  valueEqualsBoolean: {
    label: "Value Equals Boolean",
    description: "Outputs whether a value equals a given boolean.",
    type: 'valueEqualsBoolean',
    inputs: [
      {
        type: "value",
        name: "val1"
      },
      {
        type: "boolean",
        name: "val2"
      }
    ],
    outputs: [
      {
        type: "boolean",
        name: "output"
      }
    ]
  },
  valueToString: {
    type: "valueToString",
    label: "Value to Text",
    description: "Converts a value to text",
    inputs: [
      {
        type: "value",
        name: "value"
      }
    ],
    outputs: [
      {
        type: "string",
        name: "string",
        label: "Text"
      }
    ]
  },
  addText: {
    type: "addText",
    label: "Join Text",
    description: "Joins together two strings of text.",
    inputs: [
      {
        type: "string",
        name: "string1"
      },
      {
        type: "string",
        name: "string2"
      }
    ],
    outputs: [
      {
        type: "string",
        name: "output"
      }
    ]
  },
}

module.exports.InputTypes = {
  string: {
    type: "string",
    label: 'Text',
    acceptTypes: ["string"],
    color: "green",
    controls: [
      {
        type: "text",
        name: "text",
        label: "Text",
        defaultValue: ""
      }
    ]
  },
  boolean: {
    type: "boolean",
    label: 'True/False',
    acceptTypes: ["boolean"],
    controls: [
      {
        type: "checkbox",
        name: "boolean",
        label: "True/False",
        defaultValue: false
      }
    ]
  },
  number: {
    type: "number",
    label: 'Number',
    acceptTypes: ["number"],
    color: "red",
    controls: [
      {
        type: "number",
        name: "number",
        label: "Number",
        defaultValue: 0
      }
    ]
  },
  value: {
    type: "value",
    label: 'Field Value',
    acceptTypes: ["value", "number", "string", "boolean"],
    color: "yellow"
  },
  status: {
    type: "status",
    label: "Status",
    acceptTypes: ["status"],
    color: "pink",
    hidePort: true
  }
}
