SRC_DIR = src
DIST_DIR = dist

VER_NUMBER = $(shell cat version.txt)
DATE=$(shell git log -1 --pretty=format:%ad)

all: clean dist

dist:
	mkdir -p ${DIST_DIR}
	cat $(SRC_DIR)/style.css | tr '\n' ' ' | tr '\t' ' ' | sed "s/ //g" > $(DIST_DIR)/style.min.css
	cat $(SRC_DIR)/header.html \
		$(DIST_DIR)/style.min.css \
		$(SRC_DIR)/pre-body.html \
		$(SRC_DIR)/body.html \
		$(SRC_DIR)/script.js \
		$(SRC_DIR)/footer.html \
		> $(DIST_DIR)/index.html
	
	sed -i "s/@VERSION/${VER_NUMBER}. Built $(DATE)/" $(DIST_DIR)/index.html
	cp $(SRC_DIR)/favicon.ico $(DIST_DIR)/favicon.ico
	rm $(DIST_DIR)/style.min.css
	#echo ${VER_NUMBER}
	echo Build complete

clean:
	rm -rf ${DIST_DIR}

help:
	@@echo Targets:
	@@grep '^[a-z-]' Makefile

serve:
	cd $(DIST_DIR); python -m SimpleHTTPServer

gh-pages:
	# copy dist/ to gh-pages branch

.PHONY: all dist clean help serve
