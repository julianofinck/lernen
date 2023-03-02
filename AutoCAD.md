EXPERT 1		(disables "the current layer will be turned off...")
H (hatch), ENTER, Match Properties -> select the source-hatch, click within the polygon to be hatched

Super hatch (https://youtu.be/NYjgWuiD8oc)
criar hatch como .txt, trocar extensão para .pat, adicionar
No AutoCAD, botão direito na tela de desenho, Options, 
Files, Expand "Support File Search Path", "Add...", "Browse", Select the DIR where you saved the custom .pat

C:\Program Files\Autodesk\AutoCAD 2016\UserDataCache\en-us\Support\acad.pat

ACABEI 3

NBR 17025
Limite de quantificação dos ensaios
(LQ e Faixas de trabalho adicionadas aos parâmetros, rede metrológica)

MRC - Material de Referencia

Cond, OD, pH, Temperatura, TUrbidez, ORP

FT - 14 - rev 10 - Plano de Amostragem
FT - 14a - rev 02 - Plano de Trabalho
FT - 01 -
NC - 2020
Relato de resultados: 

IT = Instruções de Trabalho
FT = Formulário Técnico (para reportar resultados)



Add "pena" to new page (aba), right-click>Page Setup Manager





Servidor:
SGQA - Sistema de Gestão da Qualidade para Amostragens
\\server-poa\Compartilhamentos\SGQA\Público

FTs e ITs
\\server-poa\Compartilhamentos\SGQA\Editáveis

1º Nível: PT - Procedimentos gerais sobre matrizes
2º Nível: IT - Sub-Documento específico de uma matriz
3º Nível: FT - Sub-Sub-Documento 

Relato de Resultados



import csv to autocad:
save as .scr with the following format:

Point X,Y
Point X,Y
Point X,Y
Point X,Y
Point X,Y
Point X,Y
Point X,Y
Point X,Y



QGIS
create point layer, toggle editing, create fields lat lon nome,
field calculator $x for lon, and $y for lat (update existing field)

Custom Hatch
Right-click on drawing > Options > Files > Support File Search Path > add new path to "*.pat"

hatch syntax:

*pattern-name[, description]

angle, x-origin,y-origin, delta-x,delta-y [, dash1, dash2, …]

Hatch-pattern definitions have a few rules:

- The description is optional; if you include one, precede it with a comma.
- Add the dash specifications only for noncontinuous lines.
- You can have more than one definition line (the second line in the syntax I just showed), creating sets of hatch definitions that combine to create the hatch pattern.
- Each definition line can be no more than 80 characters.
- You can include a maximum of six dash specifications (which include spaces and dots).
- You can add spaces in the definition lines for readability.




Imagem Google Earth para o AutoCAD
- Abrir Google Earth, focar na área, Visualizar>Redefinir>Inclinação e Bússola
- Adicionar dois pontos extremos bem identificáveis (anotando os pontos Long e Lat)
- Garantir que esteja no UTM (Ferramentas>Opções>Mostrar Lat/long: UTM)
- Clicar no ícone salvar imagem para exportar.
== No AutoCAD, 
- ctrl+V ou attach.
- criar dois Point com as mesmas coordenadas.
- Allign > selecionar a imagem > selecionar o primeiro ponto, segundo ponto e no terceiro dar enter, marcar que quer redimensionar o objeto.




Importar pro QGIS:
- Salvar arquivo como .dxf
- Arrastar pro QGIS
- Se polígono, Vector > Geometry tools > Line to Polygon
- Export > Save feature as > ESRI shapefile



ERROR - Product license - Out of time

"License checkout timed out. What do you want to do?"
Services:
- den Dienst "Autodesk Desktop Licensing Service" beenden und wieder starten
- den Dienst "FlexNet Licensing Service" beenden und wieder starten



AVISO: "A licença do autocad que você está usando não é válida"

1. Fechar o AutoCAD,
2. Ctrl+Shift+Esc > Inicializar > Desabilitar o Autodesk Dektop App (e, se tiver, Autodesk Genuine Service)
3. Clicar com o botão direito e abrir local do arquivo desses desabilitados, copiar esses caminhos para um bloco de notas.
4. Abrir local do arquivo do AutoCAD, copiar esse caminho para o bloco de notas

5. Windows Defender Firewall com Segurança Avançada
6. Adicionar regras de entrada e saída para bloquear os arquivos nos caminhos anotados
7. Regras de Entrada > Nova Regra... > Programa > Caminho do programa (pasta do Autocad) > Bloquear conexão > Três opções marcadas > Dar um nome oportuno
8. Regras de Saída > Nova Regra... > Programa >  Caminho do programa (pasta do Autocad) > Bloquear conexão > Três opções marcadas > Dar um nome oportuno


Abrir serviços, 
Parar os seguintes serviços:
Autodesk Desktop App Service
Autodesk Desktop Licensing Service
FlexNet Licensing Service

Iniciar os seguintes serviços:
Autodesk Desktop App Service
Autodesk Desktop Licensing Service
FlexNet Licensing Service












## AutoCAD: commercial computer-aided design and drafting software application.
released in 1982.

## After installation, Autodesk Genuine Service
Autodesk Genuine Service.rar, run it, click on "remove". Done!
Source: https://youtu.be/xqEnDpikZdw

## Create a house project (https://youtu.be/-7hrElZrul4)
2D drawing and 3D model
Awais Mirza

- Lines, Circles, Rectangles
- Hatching
- Dimensioning
- Annotation
- Attributes
- Tables
- External references
- Layouts
- Create output


## Format extensions: DWT and DWG
Practically the same, but DWT is used to set a standard to projects
"Template files provide users a place to start.  Not only do they give a starting point, but they also force your team to be a team.  A properly executed template file, or series of template files, will instill standardization increase efficiency. " Source: https://www.augi.com/articles/detail/tipniques-why-you-should-use-a-template#:~:text=The%20most%20obvious%20difference%20between,just%20like%20a%20standard%20file.


## 3d Drawing
set DEFAULTGIZMO to 0

shift+rightClick -> snap options

# Show lineweight
LWDISPLAY 1

# To manipulate polygon vectors as in QGIS way, transforms bound-polygons to regions (Home > Draw > Region) and the operations can be used
- UNION, INTERSECT, DIFFERENCE (boolean operations)

# Divide line in # equal blocks:
DIVIDE, select object, set #   [DDTP to change the point appearance, otherwise the divisions cannot be seen]

# Status bar
"Restric cursor to specified angles" <- nice feature

# Text
First, create style -> STYLE
Create new, choose Font Name, width factor 0.8 looks cool
TEXT, height is the FontSize 

# At the end, to draw dimension,
Home > Dimensions > New Dimension Style 
(it makes easier to add several dimensions)

# Match Property works like Excel Format Brush

# Good Practice: Create layers at the start of your drawing
Wall, Interior, Doors, Windows, ...
(Layer walk hepls at the end of project to check if every object is sound in the right layer)
(Layer state presets on/off combinations. Usefull to change fast between layer groups: floor plan, 1st floor plan, ...etc)

# Blocks
Blocks are used to create pattern objects and recreate them several times. If the block drawing (double click on it) is changed, all the blocks change equally
>> Inside the block drawing, it is possible to add "dynamic movements" to the block. Door example with flip, rotate and scale. Easier to reproduce several.

# Design Center (ctrl+2)

# Content Explorer is Design Center but online with a lot of Blocks

# Tables can be created as well to keep dimensions summarized

# to Print
Output > Page Setup Manager
MVIEW > click to delimit it where to plot on the Layout tab

