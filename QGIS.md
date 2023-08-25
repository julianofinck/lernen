In QGIS syntax, "||" is the concatenation operator

Add a custom Grid
```qgis
@grid_number || 'm ' || 
CASE WHEN @grid_axis = 'x'
THEN 
  IF (@grid_number > 0, 'E' , 'W')
ELSE
  IF (@grid_number > 0, 'N' , 'S')
END
```

Sort attribute table in layout
https://gis.stackexchange.com/questions/284944/sort-attribute-table-by-hidden-column-in-print-composer

Add Bing Aerial via zoom.earth geoservice