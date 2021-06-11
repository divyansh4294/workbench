import sys
import os
from datetime import date

today = str(date.today())

photography = "1"
cinema = "2"
video = "3"
illustrator = "4"

x = (input("Select functions 1. PhotoGraphy 2. Cinema 3. Video 4. Illustrator"))


if x == "1":
    print("How do you want to name your folder")
    nameFolder = input()

    os.chdir("./Data")
    os.mkdir(nameFolder)
    os.chdir(nameFolder)
    os.mkdir("Captures")
    os.mkdir("Selected")
    os.mkdir("Exports")


if x == "2":
    print("How do you want to name your folder")
    nameFolder = input()

    os.chdir("./Data")
    os.mkdir(today+ " " + nameFolder)
    os.chdir(today+ " " + nameFolder)
    os.mkdir("Captures")
    os.mkdir("Selected")
    os.mkdir("Exports")


