Aprendizado:
Na sintaxe do QGIS, || é operador de concatenação

Custom Grid

@grid_number || 'm ' || 
CASE WHEN @grid_axis = 'x'
THEN 
  IF (@grid_number > 0, 'E' , 'W')
ELSE
  IF (@grid_number > 0, 'N' , 'S')
END



Perfil potenciometrico:
1.
2. Smooth it!



Sort attribute table in layout

https://gis.stackexchange.com/questions/284944/sort-attribute-table-by-hidden-column-in-print-composer


Descobrir data do Bing Aerial pelo zoom.earth