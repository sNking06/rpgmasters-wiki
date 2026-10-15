import re
from pathlib import Path
s=Path('app/globals.css').read_text()
def lum(c):
 a=[int(c[i:i+2],16)/255 for i in (1,3,5)];a=[x/12.92 if x<=.04045 else ((x+.055)/1.055)**2.4 for x in a];return sum(x*y for x,y in zip(a,[.2126,.7152,.0722]))
def ratio(a,b):
 a,b=sorted([lum(a),lum(b)]);return (b+.05)/(a+.05)
for theme,sel in [('dark',':root {'),('light',":root[data-theme='light'] {")]:
 block=s.split(sel,1)[1].split('}',1)[0];tokens=dict(re.findall(r'--([\w-]+): (#[\da-f]{6});',block))
 rareblock=s.split(':root { --rar-common:' if theme=='dark' else ":root[data-theme='light'] { --rar-common:",1)[1].split('}',1)[0]
 rar=dict(re.findall(r'--([\w-]+): (#[\da-f]{6});','--rar-common:'+rareblock));tokens.update(rar)
 fails=[];low=(100,None)
 for fg in ['text','text-strong','muted','faint','gold','gold-2','copper','teal','link','green','amber','red','blue']+list(rar):
  for bg in ['bg','bg-2','surface','surface-2','surface-3','th-bg','hero-a','hero-b']:
   r=ratio(tokens[fg],tokens[bg]);low=min(low,(r,fg+'/'+bg))
   if r<4.5:fails.append((fg,bg,round(r,2)))
 print(theme,'minimum',low,'failures',fails,'button',round(ratio(tokens['on-gold'],tokens['gold']),2))
