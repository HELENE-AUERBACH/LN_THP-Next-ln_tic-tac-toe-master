class Tree {
  _setOfPossibilities = [
    [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],
    [
      [
        [
          ['J1', null, null],
          [null, null, null],
          [null, null, null]
        ],
        [
          [
            [
              ['J1', 'J2', null],
              [null, null, null],
              [null, null, null]
            ],
            null
          ],
          [
            [
              ['J1', null, 'J2'],
              [null, null, null],
              [null, null, null]
            ],
            null
          ],
          [
            [
              ['J1', null, null],
              ['J2', null, null],
              [null, null, null]
            ],
            null
          ],
          [
            [
              ['J1', null, null],
              [null, 'J2', null],
              [null, null, null]
            ],
            null
          ],
          [
            [
              ['J1', null, null],
              [null, null, 'J2'],
              [null, null, null]
            ],
            null
          ],
          [
            [
              ['J1', null, null],
              [null, null, null],
              ['J2', null, null]
            ],
            null
          ],
          [
            [
              ['J1', null, null],
              [null, null, null],
              [null, 'J2', null]
            ],
            null
          ],
          [
            [
              ['J1', null, null],
              [null, null, null],
              [null, null, 'J2']
            ],
            null
          ]
        ]
      ],
      [
        [
          [null, 'J1', null],
          [null, null, null],
          [null, null, null]
        ],
        null
      ],
      [
        [
          [null, null, 'J1'],
          [null, null, null],
          [null, null, null]
        ],
        null
      ],
      [
        [
          [null, null, null],
          ['J1', null, null],
          [null, null, null]
        ],
        null
      ],
      [
        [
          [null, null, null],
          [null, 'J1', null],
          [null, null, null]
        ],
        null
      ],
      [
        [
          [null, null, null],
          [null, null, 'J1'],
          [null, null, null]
        ],
        null
      ],
      [
        [
          [null, null, null],
          [null, null, null],
          ['J1', null, null]
        ],
        null
      ],
      [
        [
          [null, null, null],
          [null, null, null],
          [null, 'J1', null]
        ],
        null
      ],
      [
        [
          [null, null, null],
          [null, null, null],
          [null, null, 'J1']
        ],
        null
      ]
    ]
  ];
  
  constructor() {
    this._root = null;
    if (this._setOfPossibilities !== undefined && this._setOfPossibilities !== null && (typeof this._setOfPossibilities === 'object')
      && Array.isArray(this._setOfPossibilities) && this._setOfPossibilities.length > 0
    ) {
      this._root = new Node([[null, null, null], [null, null, null], [null, null, null]]);
      this._root.insert(this._setOfPossibilities);
    }
  }
}
