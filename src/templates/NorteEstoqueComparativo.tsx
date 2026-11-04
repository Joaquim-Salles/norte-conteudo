import React from 'react';
import {AbsoluteFill, Composition, Img, interpolate, registerRoot, staticFile, Still, useCurrentFrame} from 'remotion';
import {ArrowRight, Check, ClipboardList, FileSpreadsheet, MapPin, Package, QrCode, Search} from 'lucide-react';
import {Background, Eyebrow, Foot, NAVY, PAD, Produto, Support, Title, Top, WHITE, ease, kit, mute} from '../lib/NortePost';
import {ensurePostLoaded, FONT_POST as SANS, FONT_POST_MONO as MONO} from '../lib/fonts';

const LOGO = kit('01-logos/norte-estoque/horizontal/norte-estoque_horizontal_branco_transparente.png');
const INVENTORY_SCREEN = kit('08-recursos/telas-oficiais/estoque/d-inventario.png');
const HOME_SCREEN = kit('08-recursos/telas-oficiais/estoque/d-home.png');
const COVER_BG = staticFile('norte-estoque-planilha-cover-v2.png');
const W = 1080;
const H = 1350;

const Cover: React.FC = () => {
  ensurePostLoaded();
  return <Produto id="estoque"><AbsoluteFill>
    <Img src={COVER_BG} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',objectPosition:'center'}}/>
    <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(20,22,58,.82) 0%,rgba(20,22,58,.62) 30%,rgba(20,22,58,.48) 48%,rgba(20,22,58,.18) 68%,rgba(20,22,58,.87) 100%)'}}/>
    <AbsoluteFill style={{background:'radial-gradient(ellipse 88% 28% at 50% 100%,rgba(22,142,154,.55),transparent 78%),linear-gradient(105deg,rgba(22,142,154,.16),transparent 48%)'}}/>
    <Img src={LOGO} style={{position:'absolute',left:PAD,top:76,height:82,width:'auto'}}/><span style={{position:'absolute',right:PAD,top:96,fontFamily:MONO,fontSize:22,color:WHITE}}>01/07</span>
    <Eyebrow tone="product" top={318}>PLANILHA × NORTE ESTOQUE</Eyebrow>
    <Title tone="product" top={378} size={80}>Até quando sua equipe vai conferir o estoque na planilha?</Title>
    <Support tone="product" top={668} width={860} size={30}>Compare como cada um acompanha inventários, produtos e movimentações.</Support>
    <Foot tone="product" label="Norte Estoque"/>
  </AbsoluteFill></Produto>;
};

const ComparePage: React.FC<{n:number; topic:string; title:string; support:string; children:React.ReactNode}> = ({n,topic,title,support,children}) => <Produto id="estoque"><AbsoluteFill>
  <Background tone="light" id={`comparativo-${n}`}/><Top n={n} total={7} tone="light"/>
  <Eyebrow tone="light" top={185}>{topic}</Eyebrow>
  <Title tone="light" top={240} size={64}>{title}</Title>
  <Support tone="light" top={405} width={900} size={26}>{support}</Support>
  {children}<Foot tone="light" label="Norte Estoque"/>
</AbsoluteFill></Produto>;

const CompareCard: React.FC<{kind:'sheet'|'norte'; title:string; body:string; children:React.ReactNode}> = ({kind,title,body,children}) => {
  const isNorte=kind==='norte';
  return <div style={{position:'relative',width:448,height:555,flexShrink:0,borderRadius:24,background:isNorte?'linear-gradient(145deg,#E4F4F5,#FBFCFE 82%)':'linear-gradient(145deg,#F6F3EC,#FCFBF8 82%)',border:`2px solid ${isNorte?'rgba(22,142,154,.42)':'#DED8CC'}`,boxShadow:'0 18px 34px rgba(20,22,58,.1)',boxSizing:'border-box',padding:26}}>
    <div style={{fontFamily:SANS,fontSize:17,fontWeight:800,letterSpacing:2.2,color:isNorte?'#168E9A':'#817968'}}>{isNorte?'NO NORTE ESTOQUE':'NA PLANILHA'}</div>
    <div style={{marginTop:16,fontFamily:SANS,fontSize:27,lineHeight:1.08,fontWeight:750,letterSpacing:-.7,color:NAVY}}>{title}</div>
    <div style={{marginTop:12,fontFamily:SANS,fontSize:18,lineHeight:1.35,color:'#53576D'}}>{body}</div>
    <div style={{position:'absolute',left:24,right:24,bottom:22,height:220,display:'grid',placeItems:'center'}}>{children}</div>
  </div>;
};

const Pair: React.FC<{leftTitle:string;leftBody:string;left:React.ReactNode;rightTitle:string;rightBody:string;right:React.ReactNode}> = ({leftTitle,leftBody,left,rightTitle,rightBody,right}) => <div style={{position:'absolute',left:PAD,top:585,width:W-PAD*2,display:'flex',gap:24,justifyContent:'center'}}>
  <CompareCard kind="sheet" title={leftTitle} body={leftBody}>{left}</CompareCard>
  <CompareCard kind="norte" title={rightTitle} body={rightBody}>{right}</CompareCard>
</div>;

const SheetMini: React.FC<{label?:string; highlight?:number}> = ({label='PRODUTOS',highlight=2}) => <div style={{width:375,height:192,background:'#FFFFFF',borderRadius:12,border:'1px solid #D8D9E2',boxShadow:'0 12px 22px rgba(20,22,58,.11)',overflow:'hidden',transform:'rotate(-1deg)'}}>
  <div style={{height:34,background:'#E8EAF0',display:'flex',alignItems:'center',gap:8,padding:'0 14px',fontFamily:MONO,fontSize:11,fontWeight:700,color:NAVY,letterSpacing:1}}><FileSpreadsheet size={15} color="#168E9A"/>{label}</div>
  <div style={{display:'grid',gridTemplateColumns:'1.15fr 1fr .8fr',padding:'0 12px'}}>
    {[['ITEM','SALDO','LOCAL'],['Tomate','18 kg','Cozinha'],['Farinha','6 kg','Depósito'],['Azeite','4 un','Cozinha'],['Arroz','12 kg','Depósito']].map((row,r)=><React.Fragment key={r}>{row.map((cell,c)=><div key={`${r}-${c}`} style={{height:30,display:'flex',alignItems:'center',paddingLeft:7,borderBottom:'1px solid #E6E7EC',background:r===highlight?'rgba(240,205,132,.28)':r===0?'#F5F6F9':'transparent',fontFamily:r===0?MONO:SANS,fontSize:r===0?9:12,fontWeight:r===0?700:500,color:r===0?'#71758A':'#50546A',overflow:'hidden',whiteSpace:'nowrap'}}>{cell}</div>)}</React.Fragment>)}
  </div>
</div>;

const VersionStack: React.FC = () => <div style={{position:'relative',width:375,height:200}}>
  {[0,1,2].map(i=><div key={i} style={{position:'absolute',left:22+i*11,top:12+i*8,width:330,height:174,background:'#FFF',border:'1px solid #D6D9E2',borderRadius:12,boxShadow:'0 12px 24px rgba(20,22,58,.12)',transform:`rotate(${(i-1)*3}deg)`,padding:15,boxSizing:'border-box'}}>
    <div style={{display:'flex',alignItems:'center',gap:8,fontFamily:MONO,fontSize:11,fontWeight:700,color:NAVY}}><FileSpreadsheet size={16} color="#168E9A"/>{['ESTOQUE.xlsx','ESTOQUE_atualizado.xlsx','ESTOQUE_final.xlsx'][i]}</div>
    <div style={{marginTop:15,display:'grid',gap:9}}>{[0,1,2,3].map(r=><div key={r} style={{height:12,display:'flex',gap:7}}><div style={{width:94,height:7,background:'#D8DBE4',borderRadius:3}}/><div style={{width:56+i*13,height:7,background:r===2&&i===1?'#E3AB58':'#D8DBE4',borderRadius:3}}/><div style={{width:68,height:7,background:'#E2E4EA',borderRadius:3}}/></div>)}</div>
  </div>)}
</div>;

const SheetTabs: React.FC = () => <div style={{width:375,height:195,borderRadius:13,background:'#FFF',border:'1px solid #D9DCE5',boxShadow:'0 12px 22px rgba(20,22,58,.1)',padding:14,boxSizing:'border-box'}}>
  <div style={{display:'flex',alignItems:'center',gap:8,fontFamily:MONO,fontSize:10,fontWeight:700,color:NAVY,letterSpacing:1}}><FileSpreadsheet size={15} color="#168E9A"/>CONTROLE DO ESTOQUE</div>
  <div style={{marginTop:13,display:'grid',gridTemplateColumns:'1.2fr .8fr .8fr',background:'#F1F2F6'}}>{['ITEM','SALDO','STATUS'].map(t=><div key={t} style={{height:24,display:'flex',alignItems:'center',paddingLeft:7,fontFamily:MONO,fontSize:8,fontWeight:700,color:'#777B8C'}}>{t}</div>)}</div>
  {['Reposição','Validade','Transferência'].map((r,i)=><div key={r} style={{height:26,display:'grid',gridTemplateColumns:'1.2fr .8fr .8fr',alignItems:'center',borderBottom:'1px solid #ECEEF2',background:i===1?'rgba(241,213,148,.22)':'#FFF'}}><span style={{paddingLeft:7,fontFamily:SANS,fontSize:10,color:'#52566D'}}>{r}</span><span style={{width:35,height:5,borderRadius:3,background:'#D5D8E1'}}/><span style={{width:40,height:5,borderRadius:3,background:i===0?'#E4B452':'#D5D8E1'}}/></div>)}
  <div style={{marginTop:8,display:'flex',gap:5}}>{['SALDO','INVENTÁRIO','ALERTAS'].map((t,i)=><span key={t} style={{padding:'5px 8px',borderRadius:'0 0 6px 6px',background:i===1?'#D8EEF0':'#F2F3F6',fontFamily:MONO,fontSize:7,fontWeight:700,color:i===1?'#168E9A':'#777B8C'}}>{t}</span>)}</div>
</div>;

const InventoryRows: React.FC = () => <div style={{width:365,height:190,borderRadius:14,background:'#FFF',border:'1px solid #E2DFD5',padding:'14px 18px',boxSizing:'border-box',boxShadow:'0 12px 22px rgba(20,22,58,.08)'}}>
  <div style={{fontFamily:MONO,fontSize:11,fontWeight:700,letterSpacing:1.2,color:'#77766F',borderBottom:'1px solid #E8E4DA',paddingBottom:10}}>CONTAGEM DO ESTOQUE</div>
  {['Tomate','Farinha','Azeite','Arroz'].map((item,i)=><div key={item} style={{height:34,display:'flex',alignItems:'center',gap:12,borderBottom:'1px solid #EEECE7'}}><span style={{width:15,height:15,border:'1.5px solid #A6A39A',borderRadius:3}}/><span style={{flex:1,fontFamily:SANS,fontSize:13,color:'#656579'}}>{item}</span><span style={{width:52,height:7,borderRadius:4,background:i===2?'#D9D7D1':'#E4E1D9'}}/></div>)}
</div>;

const QrGrid: React.FC = () => {
  const cells=Array.from({length:441},(_,i)=>({r:Math.floor(i/21),c:i%21})).filter(({r,c})=>{
    const finder=(x:number,y:number)=>r>=y&&r<y+7&&c>=x&&c<x+7;
    if(finder(0,0)||finder(14,0)||finder(0,14)) return false;
    return ((r*7+c*11+r*c)%5)<2;
  });
  const finder=(x:number,y:number)=><g transform={`translate(${x} ${y})`}><rect width="7" height="7" fill={NAVY}/><rect x="1" y="1" width="5" height="5" fill="white"/><rect x="2" y="2" width="3" height="3" fill={NAVY}/></g>;
  return <svg viewBox="-1 -1 23 23" width="100%" height="100%" shapeRendering="crispEdges"><rect x="-1" y="-1" width="23" height="23" fill="white"/>{cells.map(({r,c})=><rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill={NAVY}/>)}{finder(0,0)}{finder(14,0)}{finder(0,14)}</svg>;
};

const QrScanVisual: React.FC<{frame?:number}> = ({frame}) => {
  const p=frame===undefined?1:interpolate(frame,[8,58],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});
  return <div style={{position:'relative',width:370,height:208,display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
    <div style={{width:128,height:150,borderRadius:14,background:'linear-gradient(145deg,#F5E6C4,#DABF87)',boxShadow:'0 10px 18px rgba(20,22,58,.13)',display:'grid',placeItems:'center'}}><div style={{width:88,height:88,background:'#FFF',padding:8,borderRadius:8,boxSizing:'border-box'}}><QrGrid/></div><span style={{fontFamily:MONO,fontSize:8,fontWeight:700,color:NAVY,letterSpacing:.8}}>ITEM</span></div>
    <div style={{position:'relative',width:118,height:190,borderRadius:24,background:'#11142F',border:'3px solid #323858',padding:7,boxSizing:'border-box',boxShadow:'0 12px 20px rgba(20,22,58,.2)'}}><div style={{height:'100%',borderRadius:16,background:'#FBFBFE',display:'grid',placeItems:'center',overflow:'hidden'}}><div style={{width:72,height:72}}><QrGrid/></div><div style={{position:'absolute',left:14,right:14,top:15+145*p,height:2,background:'#22C6D0',boxShadow:'0 0 12px #22C6D0'}}/>{p>.85&&<span style={{position:'absolute',right:7,bottom:8,width:25,height:25,borderRadius:14,background:'#168E9A',display:'grid',placeItems:'center',color:WHITE}}><Check size={16}/></span>}</div></div>
  </div>;
};

const LabelVisual: React.FC = () => <div style={{position:'relative',width:365,height:205,display:'grid',placeItems:'center'}}>
  <div style={{position:'absolute',bottom:7,width:260,height:24,borderRadius:'50%',background:'rgba(20,22,58,.12)'}}/>
  <div style={{position:'absolute',left:42,top:28,width:116,height:160,borderRadius:'40px 40px 24px 24px',background:'linear-gradient(90deg,#D3B268,#F1DDAA 48%,#C4A257)',border:'2px solid #A88A4C'}}><div style={{position:'absolute',left:34,right:34,top:-10,height:18,borderRadius:'5px 5px 1px 1px',background:'#A88A4C'}}/></div>
  <div style={{position:'absolute',left:124,top:72,width:220,height:106,borderRadius:10,background:'#FFF',boxShadow:'0 10px 20px rgba(20,22,58,.16)',padding:13,boxSizing:'border-box'}}><div style={{fontFamily:MONO,fontSize:10,fontWeight:700,letterSpacing:1.2,color:'#168E9A'}}>NORTE ESTOQUE</div><div style={{marginTop:8,display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>{[['PRODUTO','LOTE'],['VALIDADE','QR CODE']].map((row,i)=>row.map(label=><div key={label} style={{fontFamily:MONO,fontSize:8,color:'#777B8D',borderTop:'1px solid #E2E4EA',paddingTop:6}}>{label}<div style={{marginTop:3,width:'75%',height:5,borderRadius:3,background:'#CDD1DC'}}/></div>))}</div></div>
</div>;

const TransferRow: React.FC = () => <div style={{width:365,height:190,borderRadius:14,background:'#FFF',border:'1px solid #E2DFD5',padding:16,boxSizing:'border-box',boxShadow:'0 12px 22px rgba(20,22,58,.08)'}}>
  <div style={{fontFamily:MONO,fontSize:10,fontWeight:700,letterSpacing:1,color:'#77766F',borderBottom:'1px solid #E8E4DA',paddingBottom:10}}>MOVIMENTAÇÃO NA PLANILHA</div>
  <div style={{marginTop:18,display:'grid',gridTemplateColumns:'1fr 26px 1fr',alignItems:'center',gap:8}}><div><div style={{fontFamily:MONO,fontSize:9,color:'#85899A'}}>ORIGEM</div><div style={{marginTop:6,fontFamily:SANS,fontSize:13,color:NAVY}}>Cozinha</div></div><ArrowRight size={20} color="#8E91A1"/><div><div style={{fontFamily:MONO,fontSize:9,color:'#85899A'}}>DESTINO</div><div style={{marginTop:6,fontFamily:SANS,fontSize:13,color:NAVY}}>Depósito</div></div></div>
  <div style={{marginTop:18,height:1,background:'#E8E4DA'}}/><div style={{marginTop:12,fontFamily:MONO,fontSize:10,color:'#85899A'}}>ATUALIZE A LINHA APÓS A MUDANÇA</div>
</div>;

const TransferVisual: React.FC<{frame?:number}> = ({frame}) => {
  const p=frame===undefined?1:interpolate(frame,[8,56],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});
  const x=82+185*p;
  return <div style={{position:'relative',width:370,height:205}}>
    {[{x:3,label:'ORIGEM'},{x:255,label:'DESTINO'}].map(({x:sx,label})=><div key={label} style={{position:'absolute',left:sx,top:24,width:112,height:150,borderRadius:14,border:'2px solid rgba(22,142,154,.45)',background:'rgba(255,255,255,.78)',display:'grid',placeItems:'center'}}><div style={{position:'absolute',top:10,left:0,right:0,textAlign:'center',fontFamily:MONO,fontSize:9,fontWeight:700,letterSpacing:1.1,color:'#168E9A'}}>{label}</div><div style={{position:'absolute',top:52,left:12,right:12,height:5,borderRadius:3,background:'#D5E7E8'}}/><div style={{position:'absolute',bottom:18,left:12,right:12,height:5,borderRadius:3,background:'#D5E7E8'}}/></div>)}
    <svg style={{position:'absolute',left:102,top:78}} width="170" height="50" viewBox="0 0 170 50"><path d="M0 25 H170" stroke="rgba(22,142,154,.35)" strokeWidth="3" strokeDasharray="6 7"/><path d={`M0 25 H${170*p}`} stroke="#168E9A" strokeWidth="4"/><path d="M158 14 L170 25 L158 36" fill="none" stroke="#168E9A" strokeWidth="3"/></svg>
    <div style={{position:'absolute',left:x,top:90,width:42,height:42,transform:'translate(-50%,-50%)',borderRadius:10,background:'#F1D594',display:'grid',placeItems:'center',color:NAVY,boxShadow:'0 8px 14px rgba(20,22,58,.18)'}}><Package size={24}/></div>
    {p>.9&&<div style={{position:'absolute',left:105,right:14,bottom:4,display:'flex',alignItems:'center',justifyContent:'center',gap:7,fontFamily:MONO,fontSize:9,fontWeight:700,letterSpacing:.9,color:'#168E9A'}}><Check size={15}/>TRANSFERÊNCIA REGISTRADA</div>}
  </div>;
};

const DashboardVisual: React.FC<{src:string}> = ({src}) => <div style={{width:385,height:218,borderRadius:13,border:'6px solid #17182D',background:'#F7F8FC',overflow:'hidden',boxShadow:'0 12px 22px rgba(20,22,58,.14)'}}><Img src={src} style={{display:'block',width:'100%',height:'100%',objectFit:'cover',objectPosition:'left top'}}/></div>;

const Versions: React.FC = () => <ComparePage n={2} topic="1 / SALDO E VERSÕES" title="O saldo da planilha bate com o estoque?" support="Abas e arquivos diferentes podem deixar a equipe sem uma referência atualizada.">
  <Pair leftTitle="Versões em paralelo" leftBody="Saldos podem mudar de um arquivo para outro." left={<VersionStack/>} rightTitle="Inventário registrado" rightBody="Consulte as contagens no painel do Norte Estoque." right={<DashboardVisual src={INVENTORY_SCREEN}/>}/>
</ComparePage>;

const Inventory: React.FC<{frame?:number}> = ({frame}) => <ComparePage n={3} topic="2 / INVENTÁRIO" title="Anotar a contagem ou registrar pelo QR Code?" support="Veja como cada rotina registra a quantidade dos produtos.">
  <Pair leftTitle="Contagem manual" leftBody="Anote os números e atualize o arquivo da planilha." left={<InventoryRows/>} rightTitle="Leitura de QR Code" rightBody="Abra o inventário pelo produto e registre a contagem." right={<QrScanVisual frame={frame}/>}/>
</ComparePage>;
const InventoryAnim: React.FC = () => <Inventory frame={useCurrentFrame()}/>;

const Identification: React.FC = () => <ComparePage n={4} topic="3 / IDENTIFICAÇÃO" title="Encontrar os dados do produto também conta" support="Produto, lote e validade precisam estar fáceis de consultar.">
  <Pair leftTitle="Buscar nas células" leftBody="Procure o item e localize as informações na planilha." left={<SheetMini label="LISTA DE PRODUTOS" highlight={2}/>} rightTitle="Identificação no item" rightBody="Consulte os dados na etiqueta que acompanha o produto." right={<LabelVisual/>}/>
</ComparePage>;

const Transfers: React.FC<{frame?:number}> = ({frame}) => <ComparePage n={5} topic="4 / TRANSFERÊNCIAS" title="Mudou de local? Registre a movimentação" support="O histórico acompanha a mudança do produto entre locais.">
  <Pair leftTitle="Atualizar a planilha" leftBody="Registre a saída e a entrada no arquivo de controle." left={<TransferRow/>} rightTitle="Transferência registrada" rightBody="Acompanhe a movimentação da origem ao destino." right={<TransferVisual frame={frame}/>}/>
</ComparePage>;
const TransfersAnim: React.FC = () => <Transfers frame={useCurrentFrame()}/>;

const Overview: React.FC = () => <ComparePage n={6} topic="5 / VISÃO DO ESTOQUE" title="Veja o que pede atenção no estoque" support="Compare as consultas espalhadas com a visão geral do Norte Estoque.">
  <Pair leftTitle="Cruzar abas e arquivos" leftBody="Localize alterações e pendências em registros diferentes." left={<SheetTabs/>} rightTitle="Alertas no painel" rightBody="Consulte produtos, alertas e tarefas em uma tela." right={<DashboardVisual src={HOME_SCREEN}/>}/>
</ComparePage>;

const Close: React.FC = () => {ensurePostLoaded();return <Produto id="estoque"><AbsoluteFill><Background tone="product" id="comparativo-close"/><Img src={LOGO} style={{position:'absolute',left:PAD,top:78,height:84,width:'auto'}}/><span style={{position:'absolute',right:PAD,top:96,fontFamily:MONO,fontSize:22,color:mute('product')}}>07/07</span>
  <Eyebrow tone="product" top={350}>NORTE ESTOQUE</Eyebrow><Title tone="product" top={420} size={78}>Conheça o Norte Estoque</Title><Support tone="product" top={555} width={860} size={30}>Acompanhe inventários, identificação de produtos e transferências na sua rotina.</Support>
  <div style={{position:'absolute',left:PAD,right:PAD,top:850,height:1,background:'rgba(251,251,254,.28)'}}/><div style={{position:'absolute',left:PAD,right:PAD,top:910,display:'flex',alignItems:'center',justifyContent:'space-between',fontFamily:SANS,fontWeight:700,fontSize:21,letterSpacing:1.6,color:WHITE}}><span>ACESSE O LINK DA BIO</span><span style={{background:WHITE,color:NAVY,borderRadius:999,padding:'20px 26px'}}>NORTE ESTOQUE →</span></div>
  <div style={{position:'absolute',right:130,bottom:185,color:'rgba(251,251,254,.13)'}}><ClipboardList size={170} strokeWidth={1.1}/></div><Foot tone="product" last label="Norte Estoque"/></AbsoluteFill></Produto>;};

export const NorteEstoqueComparativoRoot: React.FC = () => <>
  <Still id="Comparativo01" component={Cover} width={W} height={H}/>
  <Still id="Comparativo02" component={Versions} width={W} height={H}/>
  <Still id="Comparativo03" component={Inventory} width={W} height={H}/>
  <Composition id="Comparativo03Animada" component={InventoryAnim} width={W} height={H} fps={30} durationInFrames={90}/>
  <Still id="Comparativo04" component={Identification} width={W} height={H}/>
  <Still id="Comparativo05" component={Transfers} width={W} height={H}/>
  <Composition id="Comparativo05Animada" component={TransfersAnim} width={W} height={H} fps={30} durationInFrames={90}/>
  <Still id="Comparativo06" component={Overview} width={W} height={H}/>
  <Still id="Comparativo07" component={Close} width={W} height={H}/>
</>;

registerRoot(NorteEstoqueComparativoRoot);
