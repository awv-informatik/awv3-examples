var canvas = new AWV.Canvas({ dom: '#main' });
var view = new AWV.View(canvas, {
    up: new THREE.Vector3(0, 1, 0),
    near: 10,
    far: 2000,
    minDistance: 100,
    maxDistance: 1500,
    ambientIntensity: 1.2
});

var mesh = {
    "command": "Blob",
    "data": {
        "containers": [
            {
                "id": 4380,
                "properties": {
                    "color": [
                        170,
                        187,
                        204
                    ],
                    "opacity": 1,
                    "min": [
                        0,
                        0,
                        0
                    ],
                    "max": [
                        81.519,
                        65.511,
                        40
                    ]
                },
                "meshes": [
                    {
                        "id": 4366,
                        "vertices": [
                            81.519,
                            0,
                            40,
                            81.519,
                            0,
                            0,
                            81.519,
                            65.511,
                            0,
                            81.519,
                            65.511,
                            40
                        ],
                        "normals": [
                            1,
                            0,
                            0,
                            1,
                            0,
                            0,
                            1,
                            0,
                            0,
                            1,
                            0,
                            0
                        ],
                        "indices": [
                            1,
                            3,
                            0,
                            3,
                            1,
                            2
                        ],
                        "properties": {
                            "surface": {
                                "type": "plane",
                                "pointOnPlane": [
                                    81.519,
                                    0,
                                    0
                                ],
                                "normal": [
                                    1,
                                    0,
                                    0
                                ]
                            }
                        }
                    },
                    {
                        "id": 4376,
                        "vertices": [
                            0,
                            0,
                            40,
                            81.519,
                            0,
                            40,
                            81.519,
                            65.511,
                            40,
                            0,
                            65.511,
                            40
                        ],
                        "normals": [
                            0,
                            0,
                            1,
                            0,
                            0,
                            1,
                            0,
                            0,
                            1,
                            0,
                            0,
                            1
                        ],
                        "indices": [
                            1,
                            3,
                            0,
                            3,
                            1,
                            2
                        ],
                        "properties": {
                            "surface": {
                                "type": "plane",
                                "pointOnPlane": [
                                    98.279,
                                    -24.764,
                                    40
                                ],
                                "normal": [
                                    0,
                                    0,
                                    1
                                ]
                            }
                        }
                    },
                    {
                        "id": 4364,
                        "vertices": [
                            0,
                            65.511,
                            40,
                            0,
                            65.511,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            40
                        ],
                        "normals": [
                            -1,
                            0,
                            0,
                            -1,
                            0,
                            0,
                            -1,
                            0,
                            0,
                            -1,
                            0,
                            0
                        ],
                        "indices": [
                            1,
                            3,
                            0,
                            3,
                            1,
                            2
                        ],
                        "properties": {
                            "surface": {
                                "type": "plane",
                                "pointOnPlane": [
                                    0,
                                    65.511,
                                    0
                                ],
                                "normal": [
                                    -1,
                                    0,
                                    0
                                ]
                            }
                        }
                    },
                    {
                        "id": 4365,
                        "vertices": [
                            81.519,
                            65.511,
                            40,
                            81.519,
                            65.511,
                            0,
                            0,
                            65.511,
                            0,
                            0,
                            65.511,
                            40
                        ],
                        "normals": [
                            0,
                            1,
                            0,
                            0,
                            1,
                            0,
                            0,
                            1,
                            0,
                            0,
                            1,
                            0
                        ],
                        "indices": [
                            1,
                            3,
                            0,
                            3,
                            1,
                            2
                        ],
                        "properties": {
                            "surface": {
                                "type": "plane",
                                "pointOnPlane": [
                                    81.519,
                                    65.511,
                                    0
                                ],
                                "normal": [
                                    0,
                                    1,
                                    0
                                ]
                            }
                        }
                    },
                    {
                        "id": 4362,
                        "vertices": [
                            81.519,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            65.511,
                            0,
                            81.519,
                            65.511,
                            0
                        ],
                        "normals": [
                            0,
                            0,
                            -1,
                            0,
                            0,
                            -1,
                            0,
                            0,
                            -1,
                            0,
                            0,
                            -1
                        ],
                        "indices": [
                            0,
                            2,
                            3,
                            2,
                            0,
                            1
                        ],
                        "properties": {
                            "surface": {
                                "type": "plane",
                                "pointOnPlane": [
                                    98.279,
                                    -24.764,
                                    0
                                ],
                                "normal": [
                                    0,
                                    0,
                                    -1
                                ]
                            }
                        }
                    },
                    {
                        "id": 4363,
                        "vertices": [
                            0,
                            0,
                            40,
                            0,
                            0,
                            0,
                            81.519,
                            0,
                            0,
                            81.519,
                            0,
                            40
                        ],
                        "normals": [
                            0,
                            -1,
                            0,
                            0,
                            -1,
                            0,
                            0,
                            -1,
                            0,
                            0,
                            -1,
                            0
                        ],
                        "indices": [
                            1,
                            3,
                            0,
                            3,
                            1,
                            2
                        ],
                        "properties": {
                            "surface": {
                                "type": "plane",
                                "pointOnPlane": [
                                    0,
                                    0,
                                    0
                                ],
                                "normal": [
                                    0,
                                    -1,
                                    0
                                ]
                            }
                        }
                    }
                ],
                "lines": [
                    {
                        "id": 4373,
                        "points": [
                            81.519,
                            65.511,
                            0,
                            81.519,
                            65.511,
                            40
                        ]
                    },
                    {
                        "id": 4379,
                        "points": [
                            81.519,
                            0,
                            40,
                            81.519,
                            65.511,
                            40
                        ]
                    },
                    {
                        "id": 4378,
                        "points": [
                            81.519,
                            65.511,
                            40,
                            0,
                            65.511,
                            40
                        ]
                    },
                    {
                        "id": 4371,
                        "points": [
                            0,
                            65.511,
                            0,
                            0,
                            65.511,
                            40
                        ]
                    },
                    {
                        "id": 4367,
                        "points": [
                            0,
                            0,
                            0,
                            0,
                            0,
                            40
                        ]
                    },
                    {
                        "id": 4369,
                        "points": [
                            81.519,
                            0,
                            0,
                            81.519,
                            0,
                            40
                        ]
                    },
                    {
                        "id": 4354,
                        "points": [
                            81.519,
                            0,
                            0,
                            81.519,
                            65.511,
                            0
                        ]
                    },
                    {
                        "id": 4355,
                        "points": [
                            81.519,
                            65.511,
                            0,
                            0,
                            65.511,
                            0
                        ]
                    },
                    {
                        "id": 4356,
                        "points": [
                            0,
                            65.511,
                            0,
                            0,
                            0,
                            0
                        ]
                    },
                    {
                        "id": 4357,
                        "points": [
                            0,
                            0,
                            0,
                            81.519,
                            0,
                            0
                        ]
                    },
                    {
                        "id": 4377,
                        "points": [
                            0,
                            65.511,
                            40,
                            0,
                            0,
                            40
                        ]
                    },
                    {
                        "id": 4375,
                        "points": [
                            0,
                            0,
                            40,
                            81.519,
                            0,
                            40
                        ]
                    }
                ]
            }
        ],
        "properties": {
            "version": 1
        }
    }
};

canvas.parser.parse(mesh).then(function(context) {
    var presentation = new AWV.Presentation(context.models).createInteraction({ recursive: true });
    presentation.createInteraction({ recursive: true }).on({

        Hovered: function(data) {
            view.setCursor('pointer');
            if (!data.material.__originalColor)
                data.material.__originalColor = data.material.color.clone();
            data.material.animate({ color: new THREE.Color(0x28d79f), opacity: 1 }).start(0);
        },

        Unhovered: function(data) {
            data.material.animate({ color: data.material.__originalColor }).start(1000);
        }

    });

    view.scene.add(presentation);
    view.controls.focus().zoom();

});
