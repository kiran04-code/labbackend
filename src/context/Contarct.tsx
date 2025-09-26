
export const ABI = [
    {
      "inputs": [],
      "name": "basic",
      "outputs": [
        {
          "internalType": "string",
          "name": "herb_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "Farmer_Id",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "cont",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "Heavy_Metal_Pb_ppm",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "Heavy_Metal_As_ppm",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "Heavy_Metal_Hg_ppm",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "Heavy_Metal_Cd_ppm",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "Aflatoxin_Total_ppb",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "Pesticide_Residue_Total_ppm",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "env",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "Temperature_C",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "Humidity_Pct",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "Storage_Time_Days",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "Light_Exposure_hours_per_day",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBasic",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "herb_name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "Farmer_Id",
              "type": "string"
            }
          ],
          "internalType": "struct HerbQualityRecorder.BasicInfo",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getContaminants",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "Heavy_Metal_Pb_ppm",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "Heavy_Metal_As_ppm",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "Heavy_Metal_Hg_ppm",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "Heavy_Metal_Cd_ppm",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "Aflatoxin_Total_ppb",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "Pesticide_Residue_Total_ppm",
              "type": "uint256"
            }
          ],
          "internalType": "struct HerbQualityRecorder.Contaminants",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getEnv",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "Temperature_C",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "Humidity_Pct",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "Storage_Time_Days",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "Light_Exposure_hours_per_day",
              "type": "uint256"
            }
          ],
          "internalType": "struct HerbQualityRecorder.Environment",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getQuality",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "Moisture_Content_Pct",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "Essential_Oil_Pct",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "Chlorophyll_Index",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "Leaf_Spots_Count",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "Discoloration_Index",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "Total_Bacterial_Count_CFU_g",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "Total_Fungal_Count_CFU_g",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "E_coli_Present",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "Salmonella_Present",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "DNA_Marker_Authenticity",
              "type": "string"
            }
          ],
          "internalType": "struct HerbQualityRecorder.Quality",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getSoil",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "Soil_pH",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "Soil_Moisture_Pct",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "Soil_Nitrogen_mgkg",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "Soil_Phosphorus_mgkg",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "Soil_Potassium_mgkg",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "Soil_Organic_Carbon_Pct",
              "type": "uint256"
            }
          ],
          "internalType": "struct HerbQualityRecorder.Soil",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "quality",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "Moisture_Content_Pct",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "Essential_Oil_Pct",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "Chlorophyll_Index",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "Leaf_Spots_Count",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "Discoloration_Index",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "Total_Bacterial_Count_CFU_g",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "Total_Fungal_Count_CFU_g",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "E_coli_Present",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "Salmonella_Present",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "DNA_Marker_Authenticity",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_val",
          "type": "uint256"
        }
      ],
      "name": "setAflatoxin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_val",
          "type": "uint256"
        }
      ],
      "name": "setAs",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_val",
          "type": "uint256"
        }
      ],
      "name": "setBacteria",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_val",
          "type": "uint256"
        }
      ],
      "name": "setCd",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_val",
          "type": "uint256"
        }
      ],
      "name": "setChlorophyll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_val",
          "type": "string"
        }
      ],
      "name": "setDNAAuth",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_val",
          "type": "uint256"
        }
      ],
      "name": "setDiscoloration",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_val",
          "type": "string"
        }
      ],
      "name": "setEcoli",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_val",
          "type": "uint256"
        }
      ],
      "name": "setEssentialOil",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_id",
          "type": "string"
        }
      ],
      "name": "setFarmerId",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_val",
          "type": "uint256"
        }
      ],
      "name": "setFungi",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "setHerbName",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_val",
          "type": "uint256"
        }
      ],
      "name": "setHg",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_val",
          "type": "uint256"
        }
      ],
      "name": "setHumidity",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_val",
          "type": "uint256"
        }
      ],
      "name": "setLeafSpots",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_hrs",
          "type": "uint256"
        }
      ],
      "name": "setLightExposure",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_val",
          "type": "uint256"
        }
      ],
      "name": "setMoistureContent",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_val",
          "type": "uint256"
        }
      ],
      "name": "setPb",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_val",
          "type": "uint256"
        }
      ],
      "name": "setPesticideResidue",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_val",
          "type": "string"
        }
      ],
      "name": "setSalmonella",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_val",
          "type": "uint256"
        }
      ],
      "name": "setSoilMoisture",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_val",
          "type": "uint256"
        }
      ],
      "name": "setSoilNitrogen",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_val",
          "type": "uint256"
        }
      ],
      "name": "setSoilOrganicCarbon",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_val",
          "type": "uint256"
        }
      ],
      "name": "setSoilPH",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_val",
          "type": "uint256"
        }
      ],
      "name": "setSoilPhosphorus",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_val",
          "type": "uint256"
        }
      ],
      "name": "setSoilPotassium",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_days",
          "type": "uint256"
        }
      ],
      "name": "setStorageDays",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_val",
          "type": "uint256"
        }
      ],
      "name": "setTemperature",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "soil",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "Soil_pH",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "Soil_Moisture_Pct",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "Soil_Nitrogen_mgkg",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "Soil_Phosphorus_mgkg",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "Soil_Potassium_mgkg",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "Soil_Organic_Carbon_Pct",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]