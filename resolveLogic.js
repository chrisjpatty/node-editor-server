const { NodeTypes } = require('./logicTypes')

const logicContext = { values: {}, user: {} }

const getRootNode = nodes =>
  nodes[Object.values(nodes).find(n => n.type === "output").id];

const mapTransputs = (transputs, callback) => (
  Object.entries(transputs).map(([inputName, connection]) => {
    return callback(inputName, connection);
  })
);

const fireNodeFunction = (node, inputValues, nodeType) => {
  switch (node.type) {
    case "number": return { number: inputValues.number };
    case "boolean": return { boolean: inputValues.boolean };
    case "string": return { string: inputValues.string };
    case "and": return { output: inputValues.val1 && inputValues.val2 };
    case "or": return { output: inputValues.val1 || inputValues.val2 };
    case "booleanReverse": return { output: !inputValues.boolean }
    case "valueEqualsBoolean": return { output: inputValues.val1 === inputValues.val2 };
    case "valueEqualsText": return { output: inputValues.val1 === inputValues.val2 };
    case "valueEqualsValue": return { output: inputValues.val1 === inputValues.val2 };
    case "textSwitch": return { output: inputValues.test ? inputValues.textIfTrue : inputValues.textIfFalse}
    case "numberSwitch": console.log(inputValues); return { output: inputValues.test ? inputValues.numberIfTrue : inputValues.numberIfFalse}
    case "statusSwitch": return { output: inputValues.test ? inputValues.statusIfTrue : inputValues.statusIfFalse}
    case "status": return { selectedStatus: inputValues.statusValue }
    case "filingValue": {
      const value = logicContext.values[inputValues.fieldName]
      return { value: value !== undefined && typeof value === "object" ? value.value : undefined}
    }
    case "addText": return { output: inputValues.string1.toString() + inputValues.string2.toString()}
    case "valueToString": return { string: inputValues.value && inputValues.value.toString ? inputValues.value.toString() : "" }
    default:
      return {}
  }
}

const resolveInputControls = (type, data) => {
  switch (type) {
    case "number":
      return data.number;
    case "boolean":
      return data.boolean;
    case "string":
      return data.text;
    case "status":
      return data.selectedStatus
    case "textSwitch":
      return {
        textIfTrue: data.textIfTrue.text,
        textIfFalse: data.textIfFalse.text
      };
    case "numberSwitch":
      return {
        numberIfTrue: data.numberIfTrue.number,
        numberIfFalse: data.numberIfFalse.number
      };
    case "statusSwitch":
      return {
        statusIfTrue: data.statusIfTrue.status,
        statusIfFalse: data.statusIfFalse.status
      };
    case "value":
      return Object.keys(data).length ? data : undefined
    case "filingValue":
      return data.fieldName.text
    case "addText":
      return {
        string1: data.string1.text,
        string2: data.string2.text
      }
    default:
      return data;
  }
};

const resolveInputValues = (node, nodeType, nodes) => {
  return nodeType.inputs.reduce((obj, input) => {
    const inputConnections = node.connections.inputs[input.name] || []
    if(inputConnections.length > 0){
      obj[input.name] = getValueOfConnection(inputConnections[0], nodes)
    }else{
      obj[input.name] = resolveInputControls(input.type, node.inputData[input.name])
    }
    return obj
  }, {})
}

const getValueOfConnection = (connection, nodes) => {
  const outputNode = nodes[connection.nodeId]
  const outputNodeType = NodeTypes[outputNode.type]
  const inputValues = resolveInputValues(outputNode, outputNodeType, nodes)
  const outputResult = fireNodeFunction(outputNode, inputValues, outputNodeType)[connection.portName]
  return outputResult
}

const resolveLogic = (form, {values, user}) => {
  logicContext.values = values;
  logicContext.user = user
  const rootNode = getRootNode(form.definition.logic);
  const attributes = mapTransputs(
    rootNode.connections.inputs,
    (inputName, connection) => {
      return {
        name: inputName,
        value: getValueOfConnection(connection[0], form.definition.logic)
      }
    }
  ).reduce((obj, attr) => {
    obj[attr.name] = attr.value !== undefined ? attr.value : undefined
    return obj
  }, {})
  return attributes
};

module.exports = resolveLogic;
