export const storeMock = {
  auth: { loggedIn: true },
  segmentationEditor: {
    queryBuilder: {
      actions: {},
      rules: [
        {
          id: '9b9b9abb-89ab-4cde-b012-3174b52f0931',
          field: 'customer.customer.title',
          operator: 'equal',
          value: ['Mr.']
        }
      ],
      initialConditions: [
        {
          id: '9b9b9abb-89ab-4cde-b012-3174b52f0931',
          field: 'customer.customer.title',
          operator: 'equal',
          value: ['Mr.']
        }
      ],
      ruleResults: [
        {
          ruleId: '99aabbba-0123-4456-b89a-b174b51f3f66',
          segmentSize: 846,
          filteredSize: 490
        },
        {
          ruleId: '9b9b9abb-89ab-4cde-b012-3174b52f0931',
          segmentSize: 846,
          filteredSize: 490
        }
      ],
      /* tree: {
        id: '99aabbba-0123-4456-b89a-b174b51f3f66',
        type: 'group',
        children1: {
          '89b98aa8-4567-489a-bcde-f174b52d133a': {
            type: 'rule',
            properties: {
              field: null,
              operator: null,
              value: [],
              valueSrc: []
            },
            id: '89b98aa8-4567-489a-bcde-f174b52d133a'
          },
          '9b9b9abb-89ab-4cde-b012-3174b52f0931': {
            type: 'rule',
            properties: {
              field: 'customer.customer.title',
              operator: 'equal',
              value: ['Mr.'],
              valueSrc: ['value'],
              valueType: ['text']
            },
            id: '9b9b9abb-89ab-4cde-b012-3174b52f0931'
          }
        }
      }, */
      query: {
        id: '99aabbba-0123-4456-b89a-b174b51f3f66',
        rules: [
          {
            id: '9b9b9abb-89ab-4cde-b012-3174b52f0931',
            fieldName: 'customer.customer.title',
            type: 'text',
            input: 'text',
            operator: 'equal',
            values: [
              {
                type: 'text',
                value: ['Mr.']
              }
            ]
          }
        ],
        condition: 'AND',
        usedFields: ['customer.customer.title']
      }
    },
    segmentation: {
      id: 15,
      name: 'Mr.1',
      type: 1,
      segmentationCategoryId: 2,
      categoryName: 'Alapkategória',
      segmentSize: 846,
      cumulativeIntersection: 490,
      createdDate: '2020-09-22T09:40:24.273Z',
      businessPartners: []
    },
    categories: [
      {
        id: 1,
        name: 'Főkategória',
        createdDate: '2020-09-21T09:09:56.795Z'
      }
    ],
    segmentationQuery: {
      id: 2,
      segmentationId: 15,
      // tree: '{ "id": "99aabbba-0123-4456-b89a-b174b51f3f66"}',
      query: {
        condition: 'And',
        not: false,
        id: '99aabbba-0123-4456-b89a-b174b51f3f66',
        rules: [
          {
            not: false,
            id: '9b9b9abb-89ab-4cde-b012-3174b52f0931',
            fieldName: 'customer.customer.title',
            operator: 'Equal',
            type: 'Text',
            rules: [],
            values: [
              {
                value: ['Mr.']
              }
            ]
          }
        ],
        values: []
      },
      conditions: [
        {
          ruleId: '9b9b9abb-89ab-4cde-b012-3174b52f0931',
          label: 'customer.customer.title',
          operation: 'Preserved',
          operator: 'equal',
          values: ['Mr.']
        }
      ]
    },
    fields: [
      {
        fieldName: 'customer',
        label: 'querybuilder.fields.label',
        type: '!struct',
        subFields: [
          {
            fieldName: 'customer',
            label: 'querybuilder.fields.label.customer',
            type: '!struct',
            subFields: [
              {
                fieldName: 'title',
                label: 'querybuilder.fields.label.customer.title',
                selectedLabel: 'querybuilder.fields.selectedlabel.customer.title',
                type: 'text',
                operators: ['Equal', 'Not_equal', 'Like', 'Not_like'],
                listValues: {},
                subFields: []
              },
              {
                fieldName: 'firstname',
                label: 'querybuilder.fields.label.customer.firstname',
                selectedLabel: 'querybuilder.fields.selectedlabel.customer.firstname',
                type: 'text',
                operators: ['Equal', 'Not_equal', 'Like', 'Not_like'],
                listValues: {},
                subFields: []
              }
            ]
          }
        ]
      }
    ]
  }
}
