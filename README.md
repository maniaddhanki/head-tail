# Head

`head [-n count | -c bytes] file ...`

```
head file ...
  This filter displays the first count lines or bytes of each of the specified files. If count is omitted it defaults to 10.

head -c bytes file ...
  Print bytes of each of the specified files.

head -n count file ...
  Print count lines of each of the specified files.

  If more than a single file is specified, each file is preceded by a header consisting of the string ``==> XXX <=='' where ``XXX'' is the name of the file.
```

# Tail

`tail  [-r] [-q] [-c # | -n #] [file ...]`

```
tail file ...
  display the last part of a file. The default starting location is '-n 10', or the last 10 lines of the input.

tail -c number file ...
The location is number bytes.

tail -n number file ...
The location is number lines.

tail -r -c number | -n number file ...
The -r option causes the input to be displayed in reverse order, by line. 

tail -q -c number | -n number file ...
Suppresses printing of headers when multiple files are being examined.
```
