SRC_DIR = src
DIST_DIR = dist

VER_NUMBER = $(shell cat version.txt)
DATE=$(date)
VERSION = sed -i "s/@VERSION/${VER_NUMBER}. Built $(DATE)/" $(DIST_DIR)/index.html

all: clean dist

dist: prepare minify
	@@echo Dist:
	@@echo - Concatting source
	@@# this is messy - there has to be a cleaner way with make
	@@cat $(SRC_DIR)/header.html \
		$(DIST_DIR)/style.min.css \
		$(SRC_DIR)/pre-body.html \
		$(SRC_DIR)/body.html \
		$(SRC_DIR)/js/GpsChecker.js \
		$(SRC_DIR)/js/Place.js \
		$(SRC_DIR)/js/Task.js \
		$(SRC_DIR)/js/script.js \
		$(SRC_DIR)/footer.html \
		> $(DIST_DIR)/index.html
	
	@@echo - Moving favicon
	@@cp $(SRC_DIR)/favicon.ico $(DIST_DIR)/favicon.ico
	
	@@echo - Replacing @VERSION with ${VER_NUMBER}
	@@exec ${VERSION}
	
	@@echo - Cleaning CSS	
	@@rm $(DIST_DIR)/style.min.css
	@@echo - Build complete

prepare:
	@@echo Prepare:
	@@echo - Creating dist directory
	@@mkdir -p ${DIST_DIR}

clean:
	@@echo Clean:
	@@echo - Cleaning dist directory
	@@rm -rf ${DIST_DIR}

minify:
	@@echo Minify:
	@@echo - Minifying CSS
	@@cat $(SRC_DIR)/style.css | tr '\n' ' ' | tr '\t' ' ' | sed "s/  //g" > $(DIST_DIR)/style.min.css

help:
	@@echo Targets:
	@@grep '^[a-z-]' Makefile

serve:
	cd $(DIST_DIR); python -m SimpleHTTPServer

gh-pages:
	# copy dist/ to gh-pages branch

.PHONY: all dist clean help serve minify prepare
