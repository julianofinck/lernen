## Progress bar via VB Macro
- Go to **View > Macro** (em pt-br, **Exibir > Macro**)
- Name the macro: AddProgressBar
- Click on **Create**  
_(the Microsoft Visual Basic windows opens up)_
- Copy-and-paste the following (edit as needed)

```VB
Sub AddProgressBar()
    On Error Resume Next
    With ActivePresentation
        X1 = 192 ' 956 is the maximum
        Y1 = 5 '.PageSetup.SlideHeight - 534.5
        W = 572 ' Width
        H = 20
        G = W * 0.005 ' Gap
        F = 2 ' First Slide: 2 first ones are Cover and Summary
        L = .Slides.Count ' Last Slide: last one is Thanks
        For X = F To L
            ' Add BackBar
            .Slides(X).Shapes("BackBar").Delete
            Set a = .Slides(X).Shapes.AddShape(msoShapeRectangle, _
            X1, Y1, W, H)
            a.Fill.ForeColor.RGB = RGB(0, 0, 0)
            a.Line.ForeColor.RGB = RGB(0, 0, 0)
            a.Name = "BackBar"
            
            ' Add ActualBar
            .Slides(X).Shapes("ActualBar").Delete
            Set s = .Slides(X).Shapes.AddShape(msoShapeRectangle, _
            X1 + G, Y1 + G, (W - 2.5 * G) * (X - 2) / (L - 2), H * 0.6)
            s.Fill.ForeColor.RGB = RGB(31, 175, 60)
            s.Line.ForeColor.RGB = RGB(31, 175, 60)
            s.Name = "ActualBar"
            
            ' Add Text
            .Slides(X).Shapes("Text").Delete
            Set t = .Slides(X).Shapes.AddTextbox(msoTextOrientationHorizontal, _
                Left:=X1, Top:=Y1 - 5, Width:=W, Height:=10)
            With t.TextFrame.TextRange
              .Text = CStr(Round(100 * ((X - 2) / (L - 2)))) + " %"
              .Paragraphs.ParagraphFormat.Alignment = ppAlignCenter
              With .Font
                .Size = 18
                .Bold = True
                .Color.RGB = RGB(255, 255, 255)
              End With
            End With
            t.Name = "Text"
            
        Next X:
    End With
End Sub
```
- Save it, open the macros window and run it.  
(F5 pode ser usado durante edições antes de salvar)