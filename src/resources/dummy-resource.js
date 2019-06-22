export const fieldTypes = {
  string: 'string',
  date: 'date',
  array: 'array',
  multiline: 'multiline'
}

export const allFields = {
  id: {
    name: 'id',
    type: fieldTypes.string
  },
  title: {
    name: 'title',
    type: fieldTypes.string,
    isEditable: true,
    label: 'Title',
    isRequired: true
  },
  description: {
    name: 'description',
    type: fieldTypes.multiline,
    isEditable: true,
    label: 'Description',
    isRequired: true
  }
}

export const editableFields = Object.entries(allFields)
  .filter(([name, { isEditable }]) => isEditable)
  .reduce((newFields, [name, value]) => ({ ...newFields, [name]: value }), {})
