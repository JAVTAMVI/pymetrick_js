# MINIFY COMMENTS, SPACES AND OFUSCATED CODE JAVASCRIPT


import sys
import os
import re
import logging

sep = os.sep
_type = "js"           # Specifies the type of the input file
_darken = 0            # Minify only, do not obfuscate
appData = os.path.abspath(os.curdir)
LOG = logging.getLogger('minify')
hdlr = logging.FileHandler(filename=appData + sep + "minify.log")
formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')
hdlr.setFormatter(formatter)
LOG.addHandler(hdlr)

def unique_list(seq, idfun=None): 
    # order preserving
    try:
        if idfun is None:
            def idfun(x): return x
        seen = {}
        result = []
        for item in seq:
            marker = idfun(item)
            # in old Python versions:
            # if seen.has_key(marker)
            # but in new ones:
            if marker in seen: continue
            seen[marker] = 1
            result.append(item)
        return result
    except Exception as e:
        print ('Error  %s en linea %s' % (e,format(sys.exc_info()[-1].tb_lineno)))

def minify(in_file,out_file):
    print(in_file)
    print(out_file)
    if _type == 'js':
	infile = open(in_file, 'r')
	outfile = open('tmp.tmp', 'w')
	_var = list()
	for s in infile:
            s = re.sub(r'/\*.*?\*/','',s,re.MULTILINE)
            s = re.sub(r'//.*','',s,re.MULTILINE)
            s = re.sub(r'//\s+.*','',s,re.MULTILINE)
            s = re.sub(r'//\t*.*','',s,re.MULTILINE)
            s = re.sub(r'//$','',s,re.MULTILINE)
            #s = re.sub(r'\r+','',s,re.MULTILINE)
            #s = re.sub(r'\n+','',s,re.MULTILINE)
            #s = re.sub(r'\s{2,}',' ',s,re.MULTILINE)

	    # seleccionar variables que comienzan con $
	    rx=re.compile(r"[\$][\w\d_]+[\s+\W]+",re.MULTILINE)
	
	    for match in rx.finditer(s):
		# limpiar variables
		only_var = re.sub(r"\W+\Z",'',match.group())
		_var.append(only_var)

            if len(s.strip())>0:
	        outfile.write(s)

	# list de variables unicas
	_vars = list()
	_vars = unique_list(_var)
	infile.close()
	outfile.close()
	infile = open('tmp.tmp', 'r')
	outfile = open(out_file, 'w+')
	for s in infile:
	    # ofuscar variables
	    if _darken>0:
		for i in xrange(len(_vars)):
         	    s = s.replace('%s'%_vars[i],'$%s'%i)
		outfile.write(s)
	    else:
		outfile.write(s)
	infile.close()
	outfile.close()
	os.remove('tmp.tmp')


if __name__ == "__main__":
    try:
	# Get the total number of args passed to the minify.py
	
	args = sys.argv
	#args = ['--darken','--type','js','json2form.js','json2form.min.js']
	if len(args)>2:
	    # Get the arguments list
	    if "--darken" in args:
		_darken = 1
		print('darken')
		    
	    if "--type" in args:		
		in_file = args[-2].strip()
		print(in_file)
		out_file = args[-1].strip()
		print(out_file)
		if 'js' in args:
		    _type = 'js'
		    print('js')
		elif 'css' in args:
		    _type = 'css'
		    print('css')
		# check file type
		if in_file[(-1)*len(_type):] == _type:
		    minify(in_file,out_file)
		    print('created output file !!!')
		else:
		    print('not create output file !!!')
	    else:
		print('not create output file !!!')


	else:
	    print('''
	    Usage: minify.py [options] [input file] [out file]
	    
	    Global Options
	    --type <js|css>           Specifies the type of the input file
	    
	    JavaScript Options
	    --darken                  code obfuscate
	    ''')
    except Exception as e:
        LOG.error('Error %s en linea %s' % (e,format(sys.exc_info()[-1].tb_lineno)))
        sys.exc_clear()
    finally:
        pass


