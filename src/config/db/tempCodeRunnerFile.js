  for(let i of jsonData.agencies){
            insertQuery = `INSERT INTO ab_agencies VALUES (${null}, ${1}, '${i.agency_address}',
            ${i.agency_lat}, ${i.agency_lng}, ${i.agency_wilaya},
            '${i.agency_phone}', '${i.agency_fax}', "${i.agency_location_link}")`;